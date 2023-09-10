/* console.log(global) // sercular dependencies
 */

// ** configuration: 
// console.log(process)

// console.log(process.argv)

// ** current working directory:
// console.log(process.cwd())

// ** stopping script:
// console.log(process.exit)

// console.log(__dirname)

// const { program } = require('commander');
// const fs = require('fs').promises;
// const readline = require('readline');
// require('colors');

// program.option('-f, --file <type>', 'file for saving contacts', 'contacts.txt');

// program.parse(process.argv)

// ** create readline interface to interact with user
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

// ** Example how to use readline
// rl.on('line', (txt) => {
//     console.log(txt)
// })

let { addContact, removeContact, getContactById, listContacts } = require('./contacts.js')

// listContacts().then((dir) => console.log(dir));
// addContact('liza', 'liza@mail.com', '89768878');
// removeContact("3d015c92-3cc0-4b4f-b84b-26471b2053b0")

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

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        let result = await listContacts()
        console.table(result)
      break;

    case 'get':
      // ... id
      let contact = await getContactById(id)
      console.log(contact)
      break;

    case 'add':
      // ... name email phone
      let newContact = await addContact(name, email, phone) 
      console.log(newContact)
      break;

    case 'remove':
      // ... id
      let deletedContact = await removeContact(id)
      console.log(deletedContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);