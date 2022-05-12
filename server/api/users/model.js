import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import auth from '../auth.js';
import utils from '../../utils/index.js';

const { isEmail, isStrongPassword, isMobilePhone } = validator;

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, ingrese los nombres'],
    },
    lastname: {
      type: String,
      required: [true, 'Por favor, ingrese los apellidos'],
    },
    email: {
      type: String,
      required: [true, 'Por favor, ingrese un correo'],
      immutable: true,
      validate: [isEmail, 'Por favor, ingrese un correo valido'],
    },
    phone: {
      type: String,
      required: [true, 'Por favor, ingrese un número de teléfono'],
      validate: [
        isMobilePhone,
        'Por favor, ingrese un número de teléfono valido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Por favor, ingrese una constraseña'],
      validate: [
        isStrongPassword,
        'Por favor, ingrese una constraseña valida (con por lo menos: 8 characteres, 1 minúscula, 1 mayúscula, 1 número, 1 simbolo)',
      ],
    },
    userType: {
      type: String,
      required: true,
      enum: ['Administrador', 'Usuario'],
      default: 'Usuario',
    },
    state: {
      type: String,
      required: true,
      enum: ['activo', 'inactivo'],
      default: 'inactivo',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

usersSchema.path('email').validate(async function emailUniqueValidator(email) {
  const user = await this.constructor.findOne({ email });
  return Boolean(!user) || Boolean(this.id === user.id);
}, 'El correo ya esta registrado con otra cuenta');

usersSchema.pre('save', async function (next) {
  try {
    if (this.isNew || this.isModified('password')) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

usersSchema.statics.auth = async function (req) {
  const { email, password } = req.body;
  const userFound = await this.findOne({ email });

  if (!userFound)
    throw utils.errorResponseHandler(404, 'No se encontro al usuario');

  const validPassword = await bcrypt.compare(password, userFound.password);

  if (!validPassword)
    throw utils.errorResponseHandler(403, 'Usuario o contraseña incorrecta');

  if (userFound.state === 'inactivo')
    throw utils.errorResponseHandler(401, 'Usuario no activo');

  const { _id, userType } = userFound;

  return auth.signToken({ _id, userType });
};

const User = mongoose.model('Users', usersSchema, 'users');

export default User;
