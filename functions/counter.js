const { response } = require('express');
const fs = require('fs')

module.exports.increments = function () {

    fs.readFile('files/counter.txt', (error, txtString) => {

        if (error) throw error;

        data = (parseInt(txtString) + 1);
        data = data.toString()

        fs.writeFileSync('files/counter.txt', data, (error) => {
            data;
            if (error) throw err;
        })

    })
}

module.exports.getNumber = function () {

    const file = fs.readFileSync('files/counter.txt');
    const fileContent = file.toString();
    return fileContent;
}