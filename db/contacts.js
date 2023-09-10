const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let url = path.join(__dirname + "/db/contacts.json");

async function listContacts() {
  return await fs
    .readFile(url)
    .then((data) => data.toString())
    .then((json) => JSON.parse(json))
    .catch((err) => err.message);
}

async function getContactById(contactId) {
  let list = await listContacts();
  let result = list.find((element) => element.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  let list = await listContacts();
  let indexToDelete = list.findIndex((element) => element.id === contactId);
  if (indexToDelete >= 0) {
    let result = list.splice(indexToDelete, 1);
    saveContacts(list);
    return result[0];
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  let list = await listContacts();
  let newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  await saveContacts(list);
  return newContact;
}

async function saveContacts(list) {
  await fs.writeFile(url, JSON.stringify(list));
}

module.exports = { addContact, removeContact, getContactById, listContacts };
