import { Request, Response } from 'express';
import { ContactsService } from '../services/contact.service';

const contactsService = new ContactsService();

export class ContactsController {
  async getAllContacts(_: Request, res: Response) {
    try {
      const contacts = await contactsService.getAllContacts();
      res.json(contacts);
    } catch (err) {
      console.error('Ошибка получения контактов:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async createContact(req: Request, res: Response) {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }
    try {
      const contact = await contactsService.createContact(name, phone);
      res.status(201).json(contact);
    } catch (err) {
      console.error('Ошибка создания контакта:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async updateContact(req: Request, res: Response) {
    const { id } = req.params;
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }
    try {
      const contact = await contactsService.updateContact(Number(id), name, phone);
      if (!contact) {
        return res.status(404).json({ error: 'Контакт не найден' });
      }
      res.json(contact);
    } catch (err) {
      console.error('Ошибка обновления контакта:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async deleteContact(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const success = await contactsService.deleteContact(Number(id));
      if (!success) {
        return res.status(404).json({ error: 'Контактов нет' });
      }
      res.status(204).send();
    } catch (err) {
      console.error('Ошибка удаления контакта:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}