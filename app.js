const { printTable } = require('console-table-printer')
const { prompt } = require('enquirer');
const { text } = require('figlet');
var inquirer = require('inquirer');
"use strict";

const { Title, WeatherTable, Options } = require('./view')

function gra(min, max) {
    return Math.random() * (max - min) + min;
}

async function WeatherApp(cityName) {
    const axios = require('axios');
    cityName = "Santiago"
    const response = axios.get('api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=e232ab6ae238826ff24db7125b476d6b', {
    })
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function() 
    {
        a = response.json
    });

    return a;
}

/*
const fetch = require("node-fetch"); // Please don't use `axios` anymore
const weathermapKey = process.env.OPENWEATHERMAP_API_KEY;
async function fetchWeather (cityName) { // camelCase
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weathermapKey}`);
    if (!response.ok) {
        throw new Error(`Error fetching ${cityName} weather data: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
*/

async function deleteCity(p, update) 
{

    var result = Object.values(p.table.rows);
    var cityNames = new Array();
    for(i=0; i<result.length; i++) 
    {
        a = result[i].text.name
        cityNames[i] = a
    }

    const options = [{
        type: 'select',
        name: 'opt',
        message: 'Select a city: ',
        choices: cityNames
    }];

    const answer = await prompt(options);

    p2 = WeatherTable();
    for(i=0; i<result.length; i++) 
    {
        if (Object.values(p.table.rows)[i].text.name != answer['opt']) 
        {
            name2 = Object.values(p.table.rows)[i].text.name;
            min2 = Object.values(p.table.rows)[i].text.min;
            max2 = Object.values(p.table.rows)[i].text.max;
            temp2 = Object.values(p.table.rows)[i].text.temp;

            p2.addRow({ name: name2, temp: temp2, min: min2, max: max2 });
        }
    }
    
    if (update == true) 
    {
        cityName = answer['opt']
        min = Math.round(gra(0, 10))
        max = Math.round(gra(20, 35))
        temp = Math.round(gra(min, max))
        p2.addRow({ name: cityName, temp: temp, min: min, max: max })
    }

    return p2;
}

async function app(p) {
    msg = "a";
    Title();
    a = await Options();

    if (a == 1) //Add City
    {
        const response = 
        [
            {
                type: 'input',
                name: 'name',
                message: 'City Name:'
            }
        ]

        const answer = await prompt(response);

        b = answer['name']

        WeatherApp(b)

        min = Math.round(gra(0, 10))
        max = Math.round(gra(20, 35))
        temp = Math.round(gra(min, max))

        console.clear();
        p.addRow({ name: b, temp: temp, min: min, max: max });
        console.log(Title());
        p.printTable();
    }

    else if (a == 2) //Update City
    {
        min = Math.round(gra(0, 10))
        max = Math.round(gra(20, 35))
        temp = Math.round(gra(min, max))

        /*
        console.clear();
        p.addRow({ name: "Santiago", temp: temp, min: min, max: max });
        p.addRow({ name: "Buenos Aires", temp: temp, min: min, max: max });
        p.printTable();
        */

        p = await deleteCity(p, true);

        console.clear();
        console.log(Title());
        p.printTable();
    }

    else if (a == 3) //Delete city
    {
        min = Math.round(gra(0, 10))
        max = Math.round(gra(20, 35))
        temp = Math.round(gra(min, max))
        /*
        console.clear();
        p.addRow({ name: "Santiago", temp: temp, min: min, max: max });
        p.addRow({ name: "Buenos Aires", temp: temp, min: min, max: max });
        p.printTable();
        */
        
        p = await deleteCity(p, false);

        console.clear();
        console.log(Title());
        p.printTable();
    }

    else if (a == 4) 
    {
        process.exit(stopCode)
    }

    return p;
}

async function MainApp() 
{
    console.log(Title())
    p = WeatherTable();
    p.printTable();
    while (true) 
    {
        p = await app(p);
    }
}


module.exports = {
    MainApp,
    WeatherApp
}
