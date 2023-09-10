let { addContact, removeContact, getContactById, listContacts } = require('./contacts.js')

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        let result = await listContacts()
        console.table(result)
      break;

    case 'get':
      let contact = await getContactById(id)
      console.log(contact)
      break;

    case 'add':
      let newContact = await addContact(name, email, phone) 
      console.log(newContact)
      break;

    case 'remove':
      let deletedContact = await removeContact(id)
      console.log(deletedContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);