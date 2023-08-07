import { Suspense } from "react"
import { ClipLoader } from "react-spinners"

import { store } from "src/redux/store";
import { Provider } from 'react-redux'; 

import './App.css';

import Router from './router/Router';

function App() {
  return (
    <div className="App bg-gray-100 h-screen">
        <Provider store={store}>
            <Suspense
              fallback={
                <div className="flex w-full h-full items-center justify-center">
                    <ClipLoader
                        color="#3657F8"
                        loading
                        size={45}
                    />
                </div>
              }
            >
                  <Router />
              </Suspense>
        </Provider>
    </div>
  );
}

export default App;
