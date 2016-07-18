import React, {Component} from 'react';

class Connector extends Component {
  state = this.props.stores;
  mounting = true;
  componentWillUpdate() {
    this.mounting = false;
  }
  parseChildProps() {
    const props = {trunks: {}};
    for (const store_name of Object.keys(this.props.stores)) {
      const Store = this.props.stores[store_name];
      const store = new Store(this, this.mounting);
      props.trunks[store_name] = store;
    }
    return props;
  }
  render() {
    return React.cloneElement(
      this.props.children,
      this.parseChildProps()
    );
  }
}

export default function connect(Component, stores) {
  return function TrunkOpener(props) {
    return (
      <Connector stores={stores}>
        <Component {...props} />
      </Connector>
    );
  }
}
