// src/controllers/userController.mjs
import UserModel from '../models/user.mjs';

const Users = class Users {
  constructor(app) {
    this.app = app;
    this.UserModel = UserModel;
    this.run();
  }

  deleteById() {
    this.app.delete('/user/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndDelete(req.params.id).then((user) => {
          res.status(200).json(user || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] users/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  updateById() {
    this.app.put('/user/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((user) => {
          if (!user) {
            res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(user);
        }).catch(() => {
          res.status(500).json({ code: 500, message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] users/update/:id -> ${err}`);
        res.status(400).json({ code: 400, message: 'Bad request' });
      }
    });
  }

  showById() {
    this.app.get('/user/:id', (req, res) => {
      try {
        this.UserModel.findById(req.params.id).then((user) => {
          res.status(200).json(user || {});
        }).catch(() => {
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
      } catch (err) {
        console.error(`[ERROR] users/:id -> ${err}`);

        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  create() {
    this.app.post('/user/', (req, res) => {
      try {
        const userModel = new this.UserModel(req.body);

        userModel.save().then((user) => {
          res.status(200).json(user || {});
        }).catch(() => {
          res.status(200).json({});
        });
      } catch (err) {
        console.error(`[ERROR] users/create -> ${err}`);

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

export default Users;
