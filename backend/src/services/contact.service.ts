import { Contact } from '../models/Contact';

export class ContactsService {
  async getAllContacts() {
    return await Contact.findAll();
  }

  async createContact(name: string, phone: string) {
    return await Contact.create({ name, phone });
  }

  async updateContact(id: number, name: string, phone: string) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return null;
    }
    return await contact.update({ name, phone });
  }

  async deleteContact(id: number) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return false;
    }
    await contact.destroy();
    return true;
  }
}