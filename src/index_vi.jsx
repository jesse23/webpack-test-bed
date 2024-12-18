import { ViteReactSSG } from 'vite-react-ssg'
// import { lazy } from 'react'
import App from './App';

export const routes = [
  {
    path: '/',
    // Component: lazy(() => import('./App')),
    Component: App,
    // required for lazy or static resource
    entry: 'src/App.tsx',

  },
]


export const createRoot = ViteReactSSG(
  // react-router-dom data routes
  { 
    routes,
  },
  // function to have custom setups
  (/*{ router, routes, isClient, initialState }*/) => {
    // do something.
    console.log('loading react app by vite-react-ssg...');
  },
  {
    useLegacyRender: true
  }
)
