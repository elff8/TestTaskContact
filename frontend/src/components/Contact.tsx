import React, { useState } from 'react';
import { Contact as ContactType } from '../types/Contact';
import '../style/Contact.css';

interface ContactComponent {
  contacts: ContactType[];
  onUpdate: (updated: ContactType) => void;
  onDelete: (id: number) => void;
  onAdd: (name: string, phone: string) => void;
}

export const Contact = ({ contacts, onUpdate, onDelete, onAdd }: ContactComponent) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<{id: number, name: string} | null>(null);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) {
      alert("Введите имя!");
      return;
    }
    if (!/^\+?\d+$/.test(newPhone)) {
      alert("Телефон должен содержать только цифры и может начинаться с +");
      return;
    }
    
    onAdd(newName, newPhone);
    setNewName('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };
  const handleDelete = () => {
    if (contactToDelete) {
      onDelete(contactToDelete.id);
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
    }
  };

  const startEdit = (contact: ContactType) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditPhone(contact.phone);
  };

  const saveEdit = () => {
    if (!editName.trim()) {
      alert("Введите имя!");
      return;
    }
    if (!/^\+?\d+$/.test(editPhone)) {
      alert("Телефон должен содержать только цифры и может начинаться с +");
      return;
    }
  
    if (editingId && editName.trim() && editPhone.trim()) {
      onUpdate({ 
        id: editingId,
        name: editName,
        phone: editPhone
      });
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditPhone('');
  };
  const openDeleteModal = (contact: ContactType) => {
    setContactToDelete({ id: contact.id, name: contact.name });
    setIsDeleteModalOpen(true);
  };
  return (
    <div className="contact-container">
      <button 
        className="add-btn"
        onClick={() => setIsAddModalOpen(true)}>Добавить контакт</button>
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Добавить новый контакт</h3>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Имя"
            />
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Телефон"
            />
            <div className="modal-buttons">
              <button onClick={handleAdd}>Добавить</button>
              <button onClick={() => setIsAddModalOpen(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && contactToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Подтвердите удаление</h3>
            <p>Вы действительно хотите удалить контакт "{contactToDelete.name}"?</p>
            <div className="modal-buttons">
              <button className="delete-btn" onClick={handleDelete}>Удалить</button>
              <button onClick={() => setIsDeleteModalOpen(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.id}>
            {editingId === contact.id ? (
              <div className="edit-form">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                />
                <button onClick={saveEdit}>Сохранить</button>
                <button onClick={cancelEdit}>Отмена</button>
              </div>
            ) : (
              <div className="contact-item">
                <span>Имя: {contact.name}<br />Телефон: {contact.phone}</span>
                <div>
                  <button onClick={() => startEdit(contact)}>Редактировать</button>
                  <button onClick={() => openDeleteModal(contact)}>Удалить</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};