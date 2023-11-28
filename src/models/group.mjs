// src/models/group.mjs
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  coverPhoto: String,
  type: String, // public, private, secret
  allowMembersToPost: Boolean,
  allowEventCreation: Boolean,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  collection: 'groups',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const GroupSchema = mongoose.model('Group', groupSchema);
export default GroupSchema;
