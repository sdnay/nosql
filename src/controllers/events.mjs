import EventModel from '../models/event.mjs';

const Events = class Events {
  constructor(app) {
    this.app = app;
    this.EventModel = EventModel;
    this.run();
  }

  create() {
    this.app.post('/event/', (req, res) => {
      try {
        const eventModel = new this.EventModel(req.body);
        eventModel.save().then((event) => {
          res.status(200).json(event || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] events/create -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  showById() {
    this.app.get('/event/:id', (req, res) => {
      try {
        this.EventModel.findById(req.params.id).then((event) => {
          res.status(200).json(event || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] events/:id -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.get('/event/:id', (req, res) => {
      try {
        this.EventModel.findById(req.params.id).then((event) => {
          res.status(200).json(event || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] events/:id -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  updateById() {
    this.app.put('/event/:id', (req, res) => {
      try {
        this.EventModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true } // Pour renvoyer l'objet mis à jour
        ).then((event) => {
          if (!event) {
            res.status(404).json({ message: 'Event not found' });
          }
          res.status(200).json(event);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] events/update/:id -> ${err}`);
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
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

export default Events;
