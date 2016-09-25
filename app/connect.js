import React, {Component} from 'react';

// export class Connector extends Component {
//   state = this.props.stores;
//   mounted = false;
//   mounting = true;
//   updated = false;
//   componentDidMount() {
//     this.mounted = true;
//   }
//   componentWillUpdate() {
//     this.mounting = false;
//   }
//   componentDidUpdate() {
//     this.updated = true;
//   }
//   parseChildProps() {
//     console.log('parsing');
//     const props = {trunks: {}};
//     for (const store_name of Object.keys(this.props.stores)) {
//       const Store = this.props.stores[store_name];
//       const store = new Store(this, this.mounting);
//       props.trunks[store_name] = store;
//     }
//     return props;
//   }
//   render() {
//     return React.cloneElement(
//       this.props.children,
//       this.parseChildProps()
//     );
//   }
// }

export class Connector extends Component {
  state = {
    changed: 0,
    trunks: {
      actions: {},
      stores: {},
    },
  };
  constructor(props) {
    super(props);
    for (const storeName of Object.keys(this.props.stores)) {
      const Store = this.props.stores[storeName];
      const store = new Store(this, true);
      this.state.trunks.actions[storeName] = {};
      this.state.trunks.stores[storeName] = store.store;
      for (const prop of Object.getOwnPropertyNames(Store.prototype)) {
        if (typeof store[prop] === 'function' && prop !== 'constructor') {
          this.state.trunks.actions[storeName][prop] = store[prop].bind(store);
        }
      }
    }
  }
  render() {
    return React.cloneElement(
      this.props.children,
      this.state,
    );
  }
}

export default function connect(Component, stores) {
  function TrunkOpener(props) {
    return (
      <Connector stores={stores}>
        <Component {...props} />
      </Connector>
    );
  }
  TrunkOpener.displayName = Component.displayName || Component.name;
  console.log('Connecting trunk', TrunkOpener.displayName);
  return TrunkOpener;
}
