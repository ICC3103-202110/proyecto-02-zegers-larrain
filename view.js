const { prompt } = require('enquirer');

function Title() {
    const chalk = require('chalk');
    const figlet = require('figlet');
    return chalk.green(
        figlet.textSync(
            'Weather App',
            {
                horizontalLayout: 'default',
                font: 'banner'
            }
        )
    )
}

function WeatherTable() {
    const { Table } = require('console-table-printer');
    const p = new Table({
        //title: 'Title of the Table', // A text showsup on top of table (optional)
        columns: [
            { name: 'name', title: 'Name'}, // with alignment and color
            { name: 'temp', title: 'Temp'}, // lines bigger than this will be splitted in multiple lines
            { name: 'max', title: 'Max' }, // Title is what will be shown while printing, by default title = name
            { name: 'min', title: 'Min'},
        ]
    });
    return p;
}

function gra(min, max) {
    return Math.random() * (max - min) + min;
}

async function Options () {
    const enquirer = require("enquirer");
    const options = [{
        type: 'select',
        name: 'opt',
        message: 'Select action',
        choices: ["Add City", "Update City", "Delete City", "Quit"]
    }];
    
    const answer = await prompt(options);
    //console.clear();

    //var cityName = "defaultName";
    optionNum = 0
    switch (answer['opt']) {
        case "Add City":
            optionNum = 1
            break;
        case "Update City":
            optionNum = 2
            break;
        case "Delete City":
            optionNum = 3
            break;
        case "Quit":
            optionNum = 4;
            break;
    }

    return optionNum
}


module.exports = {
    Title,
    WeatherTable,
    Options,
}