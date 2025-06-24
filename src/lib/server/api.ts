import { storage } from './database';
import type { Contact } from './types';


export const getContacts = async (q?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const contacts = await storage.getItem('contacts:data') as Contact[] ?? []
  
  if(q) {
    return contacts
      .filter(contact => 
            contact?.first?.toLowerCase().includes(q.toLowerCase()) || contact?.last?.toLowerCase().includes(q.toLowerCase())
      )
  }

  return contacts
}

export const getContact = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const contacts = await storage.getItem('contacts:data') as Contact[] ?? []

  return contacts.find(contact => contact.id === id)
}

export const createContract = async(contact: Contact) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const id = contact.id ?? Math.random().toString(36).substring(2, 15);
  
  const contacts = await storage.getItem('contacts:data') as Contact[] ?? []

  const newContact = {...contact, id, favorite: false}

  await storage.setItem('contacts:data', [...contacts, newContact])

  return newContact;
}

export const updateContact = async (id: string, data: Contact) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const contacts = await storage.getItem('contacts:data') as Contact[] ?? []
  
  const newContacts = contacts.map(contact => {
    if (contact.id === id) {
      contact = { ...contact, ...data }
    }

    return contact
  })

  await storage.setItem('contacts:data', newContacts)
}

export const deleteContact = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const contacts = await storage.getItem('contacts:data') as Contact[] ?? []
  
  const newContacts = contacts.filter(contact => contact.id !== id)

  await storage.setItem('contacts:data', newContacts)
}
