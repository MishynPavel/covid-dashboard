// main.js - наш главный скрипт, который управляет всем приложением и собирает кусочки в единое целое

// импортируем все нужные модели и контроллеры

import {renameObjKeys} from './utils.js';

import UpdatedController from './controllers/updated.js';
import CountriesController from './controllers/countries.js';
import CovidModel from './models/covid.js';

const END_POINT = `https://api.covid19api.com`;

// находим наш #main - отправную точку приложения, что-то типа #root в Реакте

const main = document.querySelector('#main');

// моковые данные для тренировки - потом заменим их на реальные данные с сервера

const mockRaw = 
{
  "Global": {
    "NewConfirmed": 100282,
    "TotalConfirmed": 1162857,
    "NewDeaths": 5658,
    "TotalDeaths": 63263,
    "NewRecovered": 15405,
    "TotalRecovered": 230845
  },
  "Countries": [
    {
      "Country": "ALA Aland Islands",
      "CountryCode": "AX",
      "Slug": "ala-aland-islands",
      "NewConfirmed": 0,
      "TotalConfirmed": 0,
      "NewDeaths": 0,
      "TotalDeaths": 0,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2020-04-05T06:37:00Z"
    },
    {
      "Country": "Zimbabwe",
      "CountryCode": "ZW",
      "Slug": "zimbabwe",
      "NewConfirmed": 0,
      "TotalConfirmed": 9,
      "NewDeaths": 0,
      "TotalDeaths": 1,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2020-04-05T06:37:00Z"
    }
  ],
"Date": "2020-04-05T06:37:00Z"
};

const mock = 
{
  global: {
    newConfirmed: 100282,
    totalConfirmed: 1162857,
    newDeaths: 5658,
    totalDeaths: 63263,
    newRecovered: 15405,
    totalRecovered: 230845
  },
  countries: [
    {
      country: 'ALA Aland Islands',
      countryCode: 'AX',
      slug: 'ala-aland-islands',
      newConfirmed: 12,
      totalConfirmed: 4254,
      newDeaths: 54,
      totalDeaths: 58,
      newRecovered: 32,
      totalRecovered: 454,
      date: '2020-04-05T06:37:00Z'
    },
    {
      country: 'Zimbabwe',
      countryCode: 'ZW',
      slug: 'zimbabwe',
      newConfirmed: 65,
      totalConfirmed: 99,
      newDeaths: 2,
      totalDeaths: 32,
      newRecovered: 2,
      totalRecovered: 16,
      date: '2020-04-05T06:37:00Z'
    }
  ],
date: '2020-04-05T06:37:00Z'
};

const covidModel = new CovidModel();

// получаем данные и запускаем их в модель

const loadData = () => {
  fetch(`${END_POINT}/summary`)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      const api = JSON.parse(text);
      console.log(api);
      renameObjKeys(api);
      renameObjKeys(api.global);
      api.countries.map((item) => renameObjKeys(item));
      covidModel.setData(api);
      console.log(covidModel);

      // создаём и отрисовываем компоненты 

      const updated = new UpdatedController(main, covidModel);
      const countries = new CountriesController(main, covidModel);
      updated.render();
      countries.render();
    });
 };

loadData();