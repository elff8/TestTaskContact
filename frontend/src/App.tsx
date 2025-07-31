import React, { useState, useEffect } from 'react';
import { Contact } from './components/Contact';
import { Contact as ContactType } from './types/Contact';
import './App.css';

export default function App() {
  const [contacts, setContacts] = useState<ContactType[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contacts');
        if (!response.ok) throw new Error('Ошибка загрузки контактов');
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        const error = err as Error; 
        console.error('Ошибка:', error.message);
        alert('Не удалось загрузить контакты');
      }
    };
    fetchContacts();
  }, []);

  const handleAdd = async (name: string, phone: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка добавления контакта');
      }
      const newContact = await response.json();
      setContacts([newContact, ...contacts]);
    } catch (err) {
      const error = err as Error;
      console.error('Ошибка:', error.message);
      alert(error.message);
    }
  };

  const handleUpdate = async (updated: ContactType) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updated.name, phone: updated.phone }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка редктирования контакта');
      }
      const updatedContact = await response.json();
      setContacts(contacts.map(c => c.id === updated.id ? updatedContact : c));
    } catch (err) {
      const error = err as Error;
      console.error('Ошибка:', error.message);
      alert(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка удаления контакта');
      }
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err) {
      const error = err as Error;
      console.error('Ошибка:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="app">
      <h1>Контакты</h1>
      <Contact 
        contacts={contacts}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}