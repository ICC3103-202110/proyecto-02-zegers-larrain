const prompt = require("prompt-sync")();
const { printTable } = require('console-table-printer');

function view (counter) {

    a = "Count: " + counter + "\n" + "(-) (+)\n" + "(q) for quit\n";
    return a;

}
const { MainApp, WeatherApp } = require('./app')

MainApp();
//WeatherApp("Santiago");