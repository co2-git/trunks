import Immutable from 'immutable';

export default class Trunk {
  static id = 0;
  static store = Immutable.Map({});
  static map = Immutable.Map;
  static trunks = [];
  static set(value) {
    for (const field in value) {
      this.store = this.store.set(field, value[field]);
    }
    this.trunks
      .filter(trunk => (trunk instanceof this))
      .forEach(trunk => {
        // checking if mounted in case unmounted trunk has not yet been
        //    removed from list of trunks
        trunk.elem.updater.isMounted(trunk.elem) &&
        trunk.elem.setState({
          changed: trunk.elem.state.changed + 1,
          trunks: {
            ...trunk.elem.state.trunks,
            stores: {
              ...trunk.elem.state.trunks.stores,
              [this.name]: this.store,
            },
          },
        });
      });
  }
  static addTrunk(trunk) {
    if (trunk instanceof this) {
      this.trunks.push(trunk);
    }
    trunk.elem.componentWillUnmount = () => {
      this.trunks = this.trunks.filter(_trunk => _trunk.id !== trunk.id);
    };
  }
  constructor(elem, mounting = false) {
    this.elem = elem;
    this.name = this.constructor.name;
    this.id = this.constructor.id++;
    if (mounting) {
      this.constructor.addTrunk(this);
    }
  }
  get store() {
    return this.constructor.store;
  }
  get(prop) {
    return this.constructor.store.get(prop);
  }
  set(value) {
    this.constructor.set(value);
  }
}
