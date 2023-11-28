// src/models/ticket.mjs
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  ticketTypes: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  soldTickets: [{
    ticketType: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType' },
    buyerInfo: {
      firstname: String,
      lastname: String,
      address: String,
      purchaseDate: Date
    }
  }]
}, {
  collection: 'tickets',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const TicketModel = mongoose.model('Ticket', ticketSchema);
export default TicketModel;
