export default class Trunk {
  static store = {};
  static trunks = [];
  static set(value) {
    this.store = {...this.store, ...value};
    this.trunks.forEach(trunk =>
      trunk.elem.setState({[this.name]: {...this.store, ...value}})
    );
  }
  constructor(elem) {
    this.elem = elem;
    this.constructor.trunks.push(this);
  }
  get store() {
    return this.constructor.store;
  }
  get() {
    return this.constructor.store;
  }
  set(value) {
    const _Trunk = this.constructor;
    _Trunk.set(value);
    // this.elem.setState({[_Trunk.name]: {..._Trunk.store, ...value}});
  }
}
