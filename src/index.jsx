import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { increment } from './components/util';

console.log(increment(1));

const loadDynamicComponent = () => import('./components/DynamicComponent');

// const test = import('./components/DynamicComponent');

const App = () => {
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

ReactDOM.render(<App />, document.getElementById('root'));
