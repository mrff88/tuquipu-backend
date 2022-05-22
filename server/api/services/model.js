import mongoose from 'mongoose';
import Device from '../devices/model.js';

const { Schema } = mongoose;

const servicesSchema = new Schema(
  {
    serviceType: {
      type: String,
      required: true,
      enum: [
        'Diagnóstico',
        'Formateo',
        'Limpieza',
        'Instalación',
        'Reparación',
        'Ensamblaje',
        'Repotenciación',
      ],
      default: 'Diagnóstico',
    },
    state: {
      type: String,
      required: true,
      enum: ['Pendiente', 'Cancelado', 'Realizado'],
      default: 'Pendiente',
    },
    deviceId: {
      type: Schema.Types.ObjectId,
      required: [
        true,
        'Por favor, debe ingresar el id del dispositivo al que se le asignara el servicio',
      ],
      immutable: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

servicesSchema.path('deviceId').validate(async (deviceId) => {
  const device = await Device.findById(deviceId).exec();
  return Boolean(device);
}, 'No existe un dispositivo con Id igual al que nos envía');

servicesSchema.path('state').validate(async function verifyState(state) {
  if (this.isNew) return true;
  const device = await this.constructor.findById(this.id);
  if (device.state === 'Pendiente' && state !== 'Pendiente') return true;
  return false;
}, 'Solo se puede modificar un servicios que esta en estado pendiente');

const Service = mongoose.model('Services', servicesSchema, 'services');

export default Service;
