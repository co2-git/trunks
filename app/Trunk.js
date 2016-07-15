export default class Trunk {
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
    _Trunk.store = {
      ..._Trunk.store,
      ...value,
    };
    this.elem.setState({[_Trunk.name]: {
      ..._Trunk.store,
      ...value,
    }});
  }
}
