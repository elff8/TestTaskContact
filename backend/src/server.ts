import 'reflect-metadata';
import { sequelize } from './db';
import { app } from './app';

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Подключено к бд');
    app.listen(5000, () => {
      console.log('Сервер запущен на порту 5000');
    });
  } catch (e) {
    console.error('Ошибка запуска сервера:', e);
  }
};

start();