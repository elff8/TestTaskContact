import { Sequelize } from 'sequelize-typescript';
import { Contact } from './models/Contact';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', 
  password: 'admin123admin789',
  database: 'contacts_db',
  models: [Contact],
  logging: false
});
