import React, { Suspense } from 'react';
import { increment } from './components/util';

console.log(increment(1));

const loadDynamicComponent = () => import('./components/DynamicComponent');

// const test = import('./components/DynamicComponent');

export const App = () => {
  const [Component, setComponent] = React.useState(null);

  const handleLoadComponent = async () => {
    const { default: LoadedComponent } = await loadDynamicComponent();
    setComponent(() => LoadedComponent);
  };

  return (
    <div>
      <h1>Hello, Webpack with React!</h1>
      <button onClick={handleLoadComponent}>Load Component</button>
      <Suspense fallback={<div>Loading...</div>}>
        {Component && <Component />}
      </Suspense>
    </div>
  );
};

export default App;

