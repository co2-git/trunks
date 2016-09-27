trunks
===

Minimalistic stores for React.

# Usage

Create a store:

```javascript
// counter.js
import Trunk from 'trunks';

export default class MyTrunk extends Trunk {
  // declare your store here
  static store = Trunk.map({
    clicked: 0,
  });

  click() {
    this.set({clicked: this.get('store') + 1});
  }
}
```

In your view:

```javascript
import React, {Component} from 'react';
import {connect} from 'trunks';
import Counter from './Counter';

class ClickCounter extends Component {
  render() {
    const {Counter: CounterStore} = this.props.trunks.stores;
    const {Counter: CounterActions} = this.props.trunks.actions;
    return (
      <button onClick={() => CounterActions.click()}>
        This button has been clicked {CounterStore.clicked} times
      </button>
    );
  }
}

// Don't forget to connect your component!
// You can listen to more than one store
export default connect(ClickCounter, {Counter});
```
