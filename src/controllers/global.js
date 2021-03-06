import {render, RenderPosition} from '../utils.js';
import GlobalComponent from '../components/global.js';

export default class GlobalsController {

  constructor(container, dataModel) {
    this._container = container;
    this._dataModel = dataModel;
  }

  render() {
    // const allData = this._dataModel.getData();
    // const global = allData['Global'];
    // const sum = global['TotalConfirmed'];
    // this._global = new GlobalComponent(sum);
    this._global = new GlobalComponent();
    render(this._container, this._global, RenderPosition.AFTERBEGIN);
  }

}
