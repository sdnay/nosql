// src/models/survey.mjs
import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  questions: [{
    text: String,
    options: [String],
    responses: [{
      respondent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      answer: String
    }]
  }]
}, {
  collection: 'surveys',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;
    delete retUpdated._id;
  }
});

const SurveySchema = mongoose.model('Survey', surveySchema);
export default SurveySchema;
