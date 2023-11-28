import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator(value) {
        return this.startDate <= value;
      },
      message: 'La date de fin doit être après la date de début'
    }
  },
  location: { type: String, required: true },
  coverPhoto: {
    type: String,
    validate: {
      validator(v) {
        return /^(http?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: (props) => `${props.value} n'est pas une URL valide!`
    }
  },
  isPrivate: Boolean,
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  // Autres configurations du schéma...
}, {
  collection: 'events',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const EventSchema = mongoose.model('Event', eventSchema);
export default EventSchema;
