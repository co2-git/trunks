export default class Trunk {
  static id = 0;
  static store = {};
  static trunks = [];
  static set(value) {
    this.store = {...this.store, ...value};
    this.trunks
      .filter(trunk => (trunk instanceof this))
      .forEach(trunk =>
        // checking if mounted in case unmounted trunk has not yet been
        //    removed from list of trunks
        trunk.elem.updater.isMounted(trunk.elem) &&
        trunk.elem.setState({[this.name]: {...this.store, ...value}})
      );
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
  get() {
    return this.constructor.store;
  }
  set(value) {
    this.constructor.set(value);
  }
}
