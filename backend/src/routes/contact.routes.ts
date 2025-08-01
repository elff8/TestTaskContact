import express from 'express';
import { ContactsController } from '../controllers/contacts.controller';

const router = express.Router();
const contactsController = new ContactsController();

router.get('/', contactsController.getAllContacts);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

export default router;