import SurveyModel from '../models/survey.mjs';

const Surveys = class Surveys {
  constructor(app) {
    this.app = app;
    this.SurveyModel = SurveyModel;
    this.run();
  }

  create() {
    this.app.post('/survey/', (req, res) => {
      const surveyModel = new this.SurveyModel(req.body);
      surveyModel.save().then((survey) => {
        res.status(200).json(survey || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  showById() {
    this.app.get('/survey/:id', (req, res) => {
      this.SurveyModel.findById(req.params.id).then((survey) => {
        res.status(200).json(survey || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  deleteById() {
    this.app.delete('/survey/:id', (req, res) => {
      this.SurveyModel.findByIdAndDelete(req.params.id).then((survey) => {
        res.status(200).json(survey || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  updateById() {
    this.app.put('/survey/:id', (req, res) => {
      try {
        this.SurveyModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((survey) => {
          if (!survey) {
            res.status(404).json({ message: 'Survey not found' });
          }
          res.status(200).json(survey);
        }).catch(() => {
          res.status(500).json({ code: 500, message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] surveys/update/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.deleteById();
    this.updateById();
  }
};

export default Surveys;
