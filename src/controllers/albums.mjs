import AlbumModel from '../models/album.mjs';

const albums = class albums {
  constructor(app) {
    this.app = app;
    this.AlbumModel = AlbumModel;
    this.run();
  }

  create() {
    this.app.post('/album/', (req, res) => {
      const albumModel = new this.AlbumModel(req.body);
      albumModel.save().then((album) => {
        res.status(200).json(album);
      }).catch((error) => {
        console.error("Erreur lors de la création de l'album:", error);
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  showById() {
    this.app.get('/album/:id', (req, res) => {
      this.AlbumModel.findById(req.params.id).then((album) => {
        res.status(200).json(album || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  deleteById() {
    this.app.delete('/album/:id', (req, res) => {
      this.AlbumModel.findByIdAndDelete(req.params.id).then((album) => {
        res.status(200).json(album || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  updateById() {
    this.app.put('/album/:id', (req, res) => {
      try {
        this.AlbumModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true } // Pour renvoyer l'objet mis à jour
        ).then((album) => {
          if (!album) {
            res.status(404).json({ message: 'Album not found' });
          }
          res.status(200).json(album);
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] albums/update/:id -> ${err}`);
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

export default albums;
