import ShoppingListModel from '../models/shoppingList.mjs';

const ShoppingLists = class ShoppingLists {
  constructor(app) {
    this.app = app;
    this.ShoppingListModel = ShoppingListModel;
    this.run();
  }

  create() {
    this.app.post('/shoppingList/', (req, res) => {
      const shoppingListModel = new this.ShoppingListModel(req.body);
      shoppingListModel.save().then((shoppingList) => {
        res.status(200).json(shoppingList || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  showById() {
    this.app.get('/shoppingList/:id', (req, res) => {
      this.ShoppingListModel.findById(req.params.id).then((shoppingList) => {
        res.status(200).json(shoppingList || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  deleteById() {
    this.app.delete('/shoppingList/:id', (req, res) => {
      this.ShoppingListModel.findByIdAndDelete(req.params.id).then((shoppingList) => {
        res.status(200).json(shoppingList || {});
      }).catch(() => {
        res.status(500).json({ code: 500, message: 'Internal Server error' });
      });
    });
  }

  updateById() {
    this.app.put('/shoppinglist/:id', (req, res) => {
      try {
        this.ShoppingListModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        ).then((shoppingList) => {
          if (!shoppingList) {
            res.status(404).json({ message: 'ShoppingList not found' });
          }
          res.status(200).json(shoppingList);
        }).catch(() => {
          res.status(500).json({ code: 500, message: 'Internal Server error' });
        });
      } catch (err) {
        console.error(`[ERROR] shoppinglists/update/:id -> ${err}`);
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

export default ShoppingLists;
