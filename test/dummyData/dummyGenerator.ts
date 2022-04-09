import dataGenerator from "dummy-data-generator";
import path from 'path';
import fs from 'fs';

const userSchema = dataGenerator({
    count: 100,
    columnData: {
        id : {
            type: 'randomNumber',
            length: 5
        },
        name : {
            type: 'name'
        },
        email : {
            type: 'email',
        },
        registerDate: {
            type: 'date'
        }
    },
    isCSV: false
});


const bookSchema = dataGenerator({
    count: 100,
    columnData: {
        name : {
            type: 'name'
        },
        publishDate: {
            type: 'date'
        },
        author: {
            type: 'name'
        }
    },
    isCSV: false
});

const serializedUsers = JSON.stringify(userSchema);
const serializedBooks = JSON.stringify(bookSchema);

fs.writeFileSync(path.join(__dirname, 'users100.json'), serializedUsers, {encoding : 'utf-8'});
fs.writeFileSync(path.join(__dirname, 'books100.json'), serializedBooks, {encoding : 'utf-8'})

