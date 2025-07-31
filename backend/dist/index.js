"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const Contact_1 = require("./models/Contact");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_, res) => {
    res.send('Сервер работает!');
});
// Получить все контакты
app.get('/api/contacts', async (_, res) => {
    try {
        const contacts = await Contact_1.Contact.findAll();
        res.json(contacts);
    }
    catch (err) {
        console.error('Ошибка получения контактов:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});
// Добавить контакт
app.post('/api/contacts', async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }
    if (!/^\+?\d+$/.test(phone)) {
        return res.status(400).json({ error: 'Телефон должен содержать только цифры и может начинаться с "+ "' });
    }
    try {
        const contact = await Contact_1.Contact.create({ name, phone });
        res.status(201).json(contact);
    }
    catch (err) {
        console.error('Ошибка создания контакта:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});
// Обновить контакт
app.put('/api/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }
    if (!/^\+?\d+$/.test(phone)) {
        return res.status(400).json({ error: 'Телефон должен содержать только цифры и может начинаться с "+ "' });
    }
    try {
        const contact = await Contact_1.Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Контакт не найден' });
        }
        await contact.update({ name, phone });
        res.json(contact);
    }
    catch (err) {
        console.error('Ошибка обновления контакта:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});
// Удалить контакт
app.delete('/api/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact_1.Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ error: 'Контакт не найден' });
        }
        await contact.destroy();
        res.status(204).send();
    }
    catch (err) {
        console.error('Ошибка удаления контакта:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});
const start = async () => {
    try {
        await db_1.sequelize.authenticate();
        console.log('Подключение к PostgreSQL успешно');
        app.listen(5000, () => {
            console.log('Сервер запущен на порту 5000');
        });
    }
    catch (e) {
        console.error('Ошибка запуска сервера:', e);
    }
};
start();
