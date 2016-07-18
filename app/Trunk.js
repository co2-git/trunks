export default class Trunk {
  static store = {};
  static trunks = [];
  static set(value) {
    this.store = {...this.store, ...value};
    this.trunks.forEach(trunk =>
      trunk.elem.setState({[this.name]: {...this.store, ...value}})
    );
  }
  constructor(elem, mounting = false) {
    this.elem = elem;
    if (mounting) {
      this.constructor.trunks.push(this);
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
