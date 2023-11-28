// src/models/thread.mjs
import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  relatedTo: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: {
    type: String,
    required: true,
    enum: ['Event', 'Group']
  },
  messages: [{
    text: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedAt: Date
  }]
}, {
  collection: 'threads',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const ThreadSchema = mongoose.model('Thread', threadSchema);
export default ThreadSchema;
