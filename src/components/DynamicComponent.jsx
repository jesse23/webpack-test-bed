import React from 'react';
import { increment } from './util';

console.log(increment(1));

const DynamicComponent = () => {
  return <h2>This is a dynamically loaded component!</h2>;
};

export default DynamicComponent;
