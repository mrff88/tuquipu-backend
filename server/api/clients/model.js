import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail, isMobilePhone } = validator;
const { Schema } = mongoose;

const clientsSchema = new Schema(
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
    dni: {
      type: String,
      required: [true, 'Por favor, ingrese un DNI'],
      minlength: [8, 'El DNI debe tener como mínimo 8 dígitos'],
      maxlength: [8, 'El DNI debe tener como máximo 8 dígitos'],
      match: [
        /^\d{8}(?:[-\s]\d{4})?$/,
        'Por favor, ingrese un número de DNI válido',
      ],
    },
    address: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

clientsSchema
  .path('email')
  .validate(async function emailUniqueValidator(email) {
    const user = await this.constructor.findOne({ email });
    return Boolean(!user) || Boolean(this.id === user.id);
  }, 'El correo ya esta registrado con otra cuenta');

const Client = mongoose.model('Clients', clientsSchema, 'clients');

export default Client;
