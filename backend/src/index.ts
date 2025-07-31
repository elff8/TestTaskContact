import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { sequelize } from './db';
import { Contact } from './models/Contact';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Сервер работает!');
});

app.get('/api/contacts', async (_: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err: unknown) {
    console.error('Ошибка получения контактов:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/contacts', async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }
  if (!/^\+?\d+$/.test(phone)) {
    return res.status(400).json({ error: 'Телефон должен содержать только цифры и может начинаться с "+ "' });
  }
  try {
    const contact = await Contact.create({ name, phone });
    res.status(201).json(contact);
  } catch (err: unknown) {
    console.error('Ошибка создания контакта:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.put('/api/contacts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }
  if (!/^\+?\d+$/.test(phone)) {
    return res.status(400).json({ error: 'Телефон должен содержать только цифры и может начинаться с "+ "' });
  }
  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Контакт не найден' });
    }
    await contact.update({ name, phone });
    res.json(contact);
  } catch (err: unknown) {
    console.error('Ошибка обновления контакта:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.delete('/api/contacts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Контакт не найден' });
    }
    await contact.destroy();
    res.status(204).send();
  } catch (err: unknown) {
    console.error('Ошибка удаления контакта:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    console.log('Подключение к PostgreSQL успешно');
    app.listen(5000, () => {
      console.log('Сервер запущен на порту 5000');
    });
  } catch (e: unknown) {
    console.error('Ошибка запуска сервера:', e);
  }
};

start();