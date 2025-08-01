import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contact.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_: any, res: any) => {
  res.send('Сервер запущен');
});

app.use('/api/contacts', contactsRouter);