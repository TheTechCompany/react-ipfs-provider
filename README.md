# react-ipfs-provider

[![npm package][npm-badge]][npm]

IPFS Context Provider for React, all the fun of IPFS with as little prop
drilling and double locking repo's as possible

## Install

With NPM 

```
npm i --save react-ipfs-provider
```

With Yarn

```
yarn add react-ipfs-provider
```

## Usage

App.js

```javascript
import React from 'react';
import Component from './component';
import { Provider } from 'react-ipfs-provider';

export default function App(props){
  return (
    <Provider ipfs={/* optional ipfs node prop */}>
      <div>
        <Component />
      </div>
    </Provider>
  );
}

```

Component.js

```javascript
import React from 'react';

import { withIPFS } from 'react-ipfs-provider';

function Component(props){
  
  React.useEffect(() => {
    props.ipfs.add('Content to IPFS')
  }, [])
  
  return (
    <div>
      {props.ipfs.provider.id} 
    </div>
  );
}

export default withIPFS(Component)
```

[npm-badge]: https://img.shields.io/npm/v/react-ipfs-provider.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-ipfs-provider
