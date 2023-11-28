import CarpoolModel from '../models/carpool.mjs';

const Carpools = class Carpools {
  constructor(app) {
    this.app = app;
    this.CarpoolModel = CarpoolModel;
    this.run();
  }

  create() {
    this.app.post('/carpool/', (req, res) => {
      const carpoolModel = new this.CarpoolModel(req.body);
      carpoolModel.save().then((carpool) => {
        res.status(200).json(carpool);
      }).catch((error) => {
        console.error('Erreur lors de la création du covoiturage:', error);
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  showById() {
    this.app.get('/carpool/:id', (req, res) => {
      this.CarpoolModel.findById(req.params.id).then((carpool) => {
        res.status(200).json(carpool || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  deleteById() {
    this.app.delete('/carpool/:id', (req, res) => {
      this.CarpoolModel.findByIdAndDelete(req.params.id).then((carpool) => {
        res.status(200).json(carpool || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  updateById() {
    this.app.put('/carpool/:id', (req, res) => {
      try {
        this.CarpoolModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true } // Pour renvoyer l'objet mis à jour
        ).then((carpool) => {
          if (!carpool) {
            res.status(404).json({ message: 'Carpool not found' });
          }
          res.status(200).json(carpool);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] carpools/update/:id -> ${err}`);
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

export default Carpools;
