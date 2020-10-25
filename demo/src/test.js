import React from 'react';
import { withIPFS } from '../../src';

function Test(props){
  return (
    <div>{props.ipfs && props.ipfs.provider.id}</div>
  );    
}

export default withIPFS(Test)
