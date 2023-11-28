import TicketModel from '../models/ticket.mjs';

const Tickets = class Tickets {
  constructor(app) {
    this.app = app;
    this.TicketModel = TicketModel;
    this.run();
  }

  create() {
    this.app.post('/ticket/', async (req, res) => {
      try {
        const ticketModel = new this.TicketModel(req.body);
        const ticket = await ticketModel.save();
        return res.status(201).json(ticket);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    });
  }

  showById() {
    this.app.get('/ticket/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findById(req.params.id);
        if (!ticket) {
          return res.status(404).json({ message: 'Ticket not found' });
        }
        return res.status(200).json(ticket);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  }

  updateById() {
    this.app.put('/ticket/:id', async (req, res) => {
      try {
        const updatedTicket = await this.TicketModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedTicket) {
          return res.status(404).json({ message: 'Ticket not found' });
        }
        return res.status(200).json(updatedTicket);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    });
  }

  deleteById() {
    this.app.delete('/ticket/:id', async (req, res) => {
      try {
        const ticket = await this.TicketModel.findByIdAndDelete(req.params.id);
        if (!ticket) {
          return res.status(404).json({ message: 'Ticket not found' });
        }
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  }

  run() {
    this.create();
    this.showById();
    this.updateById();
    this.deleteById();
  }
};

export default Tickets;
