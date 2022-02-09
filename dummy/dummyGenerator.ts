import dataGenerator from "dummy-data-generator";
import path from 'path';
import fs from 'fs';

const data = dataGenerator({
    count: 10,
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

const serializedUsers = JSON.stringify(data);

fs.writeFileSync(path.join(__dirname, 'users100.json'), serializedUsers, {encoding : 'utf-8'})

