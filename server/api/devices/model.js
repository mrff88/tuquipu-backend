import mongoose from 'mongoose';
import validator from 'validator';
import Client from '../clients/model.js';

const { isURL } = validator;

const { Schema } = mongoose;

const devicesSchema = new Schema(
  {
    deviceType: {
      type: String,
      required: true,
      enum: ['PC', 'Laptop', 'All-In-One'],
      default: 'PC',
    },
    brand: {
      type: String,
      required: [true, 'Por favor, ingrese la marca del dispositivo'],
    },
    model: {
      type: String,
      required: [true, 'Por favor, ingrese el modelo del dispositivo'],
      match: [
        /^[a-zA-Z0-9-\s]+$/,
        'Solo puede usar valores alfanuméricos, espacios o guiones',
      ],
    },
    serialNumber: {
      type: String,
      required: [
        true,
        'Por favor, ingrese el número de serial del dispositivo',
      ],
      match: [
        /^[a-zA-Z0-9-\s]+$/,
        'Solo puede usar valores alfanuméricos, espacios o guiones',
      ],
    },
    yearMade: {
      type: String,
      match: [/^\d{4}$/, 'Por favor, ingrese un año valido'],
      default: '',
    },
    imgUrl: {
      type: String,
      required: [true, 'Por favor, debe agregar una imagen'],
      validate: [isURL, 'Por favor, ingrese un link de imágen valido'],
    },
    clientId: {
      type: Schema.Types.ObjectId,
      required: [
        true,
        'Por favor, debe ingresar el id del dueño del dispositivo',
      ],
      immutable: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

devicesSchema.path('clientId').validate(async (clientId) => {
  const client = await Client.findById(clientId).exec();
  return Boolean(client);
}, 'No existe cliente con Id igual al que nos envía');

const Device = mongoose.model('Devices', devicesSchema, 'devices');

export default Device;
