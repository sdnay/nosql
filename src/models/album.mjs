// src/models/photoAlbum.mjs
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  photos: [{
    imageUrl: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedAt: Date
  }]
}, {
  collection: 'albums',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const AlbumSchema = mongoose.model('Album', albumSchema);
export default AlbumSchema;
