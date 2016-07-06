import React, {Component} from 'react';
import {View} from 'reactors';
import _ from 'lodash';

export class Store {
  constructor(elem) {
    this.elem = elem;
  }
  get() {
    return this.constructor.store;
  }
  set(value) {
    const _Store = this.constructor;
    _Store.store = {
      ..._Store.store,
      ...value,
    };
    this.elem.setState({[_Store.name]: {
      ..._Store.store,
      ...value,
    }})
  }
}

class Connector extends Component {
  state = this.props.stores;
  parseChildProps() {
    const props = {};
    for (const store_name of _.keys(this.props.stores)) {
      const store = new (this.props.stores[store_name])(this);
      props[store_name] = store;
    }
    return props;
  }
  render() {
    return (
      <View>
        {React.cloneElement(this.props.children, this.parseChildProps())}
      </View>
    );
  }
}

function curryActions(actions, connector) {
  const curry = {};
  for (const action_name in actions) {
    const action = actions[action_name];
    curry[action_name] = (...props) => {
      const wrapper = action(...props);
      return wrapper({
        update: (value) => connector.setState({value}),
      });
    };
  }
  return curry;
}

export default function connect(Component, stores) {
  return props => (
    <Connector stores={stores}>
      <Component {...props} />
    </Connector>
  );
}
