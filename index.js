const {program} = require("commander");
const contacts = require('./contacts');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action) {
        case "list":
            const listOfContacts = await contacts.listContacts();
            return console.log(listOfContacts);

        case "get":
            const contactBiId = await contacts.getContactById(id);
            return console.log(contactBiId);

        case "add":
            const newContact = await contacts.addContact({name, email, phone});
            return console.log(newContact);

        case "remove":
            const deleteContact = await contacts.removeContact(id);
            return console.log(deleteContact);
        
        default:
            console.warn("\x1B[31m Unknown action type!");
            }
    }


invokeAction(argv);
