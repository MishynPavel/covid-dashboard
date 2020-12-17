import {render, replace, remove, RenderPosition, filterById} from '../utils.js';
import CountriesComponent from '../components/countries.js';
import DeathsComponent from '../components/deaths.js';
import RecoveriesComponent from '../components/recoveries.js';
export default class CountriesController {

  constructor(container, model, filter = null) {
    this._container = container;
    this._model = model;
    this._filter = filter;
    this._countries = null;
    this._deaths = null;
    this._recoveries = null;
  }

  render() {
    const data = this._model.getData();

    this._countries = new CountriesComponent(data, this._filter);
    this._deaths = new DeathsComponent(data, this._filter);
    this._recoveries = new RecoveriesComponent(data, this._filter);
    
    console.log('old filter', this._filter);

    this._countries.setClickHandler((evt) => {
      this.onFilterChange(evt);
      console.log('newFilter', this._filter);
      this.removeLists();
      this.createLists(data);
      this._countries.recoveryListeners();
      this.renderLists();
    });

    this._deaths.setClickHandler((evt) => {
      this.onFilterChange(evt);
      console.log('newFilter', this._filter);
      this.removeLists();
      this.createLists(data);
      this._deaths.recoveryListeners();
      this.renderLists();
    });

    this._recoveries.setClickHandler((evt) => {
      this.onFilterChange(evt);
      console.log('newFilter', this._filter);
      this.removeLists();
      this.createLists(data);
      this._recoveries.recoveryListeners();
      this.renderLists();
    });

    this.renderLists();
    
  }

  onFilterChange(evt) {
    evt.preventDefault();
    const parent = evt.target.parentElement;
    const chosenCountry = parent.classList[0].slice(2);
    const newFilter = chosenCountry[0].toUpperCase() + chosenCountry.slice(1);
    this._filter = newFilter;
  }

  createLists(data) {
    const newCountries = new CountriesComponent(data, this._filter);
    const newDeaths = new DeathsComponent(data, this._filter);
    const newRecoveries = new RecoveriesComponent(data, this._filter);
    this._countries = newCountries;
    this._deaths = newDeaths;
    this._recoveries = newRecoveries;
  }

  removeLists() {
    remove(this._countries);
    remove(this._deaths);
    remove(this._recoveries);
  }

  renderLists() {
    render(this._container, this._countries, RenderPosition.BEFOREEND);
    render(this._container, this._deaths, RenderPosition.BEFOREEND);
    render(this._container, this._recoveries, RenderPosition.BEFOREEND);
  }

}
