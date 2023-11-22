import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);
    case "get":
      const oneContact = await getContactById(id);
      return console.log(oneContact);
    case "add":
      const addedContact = await addContact(name, email, phone);
      return console.log(addedContact);
    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
    default:
      console.log("Unknown action");
  }
};

invokeAction(argv);
