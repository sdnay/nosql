// src/models/carpool.mjs
import mongoose from 'mongoose';

const carpoolSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  departureLocation: String,
  departureTime: Date,
  price: Number,
  availableSeats: Number,
  maximumDetourTime: Number,
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  collection: 'carpools',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const CarpoolSchema = mongoose.model('Carpool', carpoolSchema);
export default CarpoolSchema;
