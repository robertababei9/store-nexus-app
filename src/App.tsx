import { Suspense } from "react"

import './App.css';

import Router from './router/Router';

function App() {
  return (
    <div className="App bg-gray-100">
      <Suspense fallback={<>Loading ...</>}>
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
