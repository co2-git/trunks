export default class Trunk {
  static set(value) {
    this.store = {...this.store, ...value};
  }
  constructor(elem) {
    this.elem = elem;
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
    this.elem.setState({[_Trunk.name]: {..._Trunk.store, ...value}});
  }
}
