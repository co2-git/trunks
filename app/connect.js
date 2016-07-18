import React, {Component} from 'react';
import {View} from 'reactors';
import _ from 'lodash';

class Connector extends Component {
  state = this.props.stores;
  parseChildProps() {
    console.log(this.props.stores);
    const props = {trunks: {}};
    for (const store_name of Object.keys(this.props.stores)) {
      const store = new (this.props.stores[store_name])(this);
      props.trunks[store_name] = store;
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
  return function TrunkOpener (props) {
    return (
      <Connector stores={stores}>
        <Component {...props} />
      </Connector>
    );
  }
}
