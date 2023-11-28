import ThreadModel from '../models/thread.mjs';

const threads = class threads {
  constructor(app) {
    this.app = app;
    this.ThreadModel = ThreadModel;
    this.run();
  }

  create() {
    this.app.post('/thread/', (req, res) => {
      const threadModel = new this.ThreadModel(req.body);
      threadModel.save().then((thread) => {
        res.status(200).json(thread || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  showById() {
    this.app.get('/thread/:id', (req, res) => {
      this.ThreadModel.findById(req.params.id).then((thread) => {
        res.status(200).json(thread || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  deleteById() {
    this.app.delete('/thread/:id', (req, res) => {
      this.ThreadModel.findByIdAndDelete(req.params.id).then((thread) => {
        res.status(200).json(thread || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  updateById() {
    this.app.put('/thread/:id', (req, res) => {
      try {
        this.ThreadModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((thread) => {
          if (!thread) {
            res.status(404).json({ message: 'Thread not found' });
          }
          res.status(200).json(thread);
        }).catch(() => {
          res.status(500).json({ code: 500, message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] threads/update/:id -> ${err}`);
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

export default threads;
