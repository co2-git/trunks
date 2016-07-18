export default class Trunk {
  static store = {};
  static trunks = [];
  static set(value) {
    this.store = {...this.store, ...value};
    this.trunks
      .filter(trunk => (trunk instanceof this))
      .forEach(trunk =>
        trunk.elem.setState({[this.name]: {...this.store, ...value}})
      );
  }
  static addTrunk(trunk) {
    if (trunk instanceof this) {
      this.trunks.push(trunk);
    }
  }
  constructor(elem, mounting = false) {
    this.elem = elem;
    this.name = this.constructor.name;
    if (mounting) {
      this.constructor.addTrunk(this);
    }
  }
  get store() {
    return this.constructor.store;
  }
  get() {
    return this.constructor.store;
  }
  set(value) {
    this.constructor.set(value);
  }
}
