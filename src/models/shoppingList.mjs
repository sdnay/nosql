// src/models/shoppingList.mjs
import mongoose from 'mongoose';

const shoppingListItemSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  arrivalTime: Date,
  broughtBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const shoppingListSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  items: [shoppingListItemSchema]
}, {
  collection: 'shoppingLists',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const ShoppingListSchema = mongoose.model('ShoppingList', shoppingListSchema);
export default ShoppingListSchema;
