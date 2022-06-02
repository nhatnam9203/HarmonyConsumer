import _ from 'lodash';

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    // Initialize object
    this.alertDict = new Object({});
    return Singleton.instance;
  }
  // Properties & Methods

  alert(message, id) {
    if (!id) alert(message);
    else {
      const isExist = _.get(this.alertDict, `${id}`);
      if (!isExist) {
        _.set(this.alertDict, `${id}`, message);
        alert(message);
      }
    }
  }

  clearById(id) {
    if (!id) return;
    const isExist = _.get(this.alertDict, `${id}`);
    if (isExist) _.unset(this.alertDict, `${id}`);
  }
}

const AlertManager = new Singleton();
Object.freeze(AlertManager);

export default AlertManager;
