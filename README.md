trunks
===

Minimalistic stores for React Flux.

# Usage

Create a store:

```javascript
// counter.js
import Trunk from 'trunks';

export default class MyTrunk extends Trunk {
  // declare your store here
  static store = {
    clicked: 0,
  };

  click() {
    this.up({clicked: 1});
  }
}
```

In your view:

```javascript
import React, {Component} from 'react';
import {open} from 'trunks';
import counter from './counter';

class ClickCounter extends Component {
  render() {
    const {counter} = this.props.trunks;
    return (
      <button onClick={() => counter.click()}>
        This button has been clicked {counter.store.clicked} times
      </button>
    );
  }
}

// Don't forget to connect your component!
// You can listen to more than one store
export default open(ClickCounter, {counter});
```
