const fs = require("fs/promises");
const {nanoid} = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async()=> {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async(id)=> {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}

const removeContact = async(id) =>{
    const list = await listContacts();
    const index = list.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result;
}

const addContact = async(data)=>{
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }