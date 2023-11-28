// src/models/user.mjs
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  city: String
  // Ajouter d'autres champs selon les besoins
}, {
  collection: 'users', // Nom de la collection dans MongoDB
  minimize: false, // Ne pas supprimer les champs vides
  versionKey: false // Désactiver le champ __v pour la gestion des versions
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
