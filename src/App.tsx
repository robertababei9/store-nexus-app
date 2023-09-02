import { Suspense } from "react"
import { ClipLoader } from "react-spinners"

import { persistor, store } from "src/redux/store";
import { Provider } from 'react-redux'; 
import { PersistGate } from "redux-persist/integration/react"

import './App.css';

import Router from './router/Router';

function App() {
  return (
    <div className="App bg-gray-100 h-screen">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

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
              
          </PersistGate>
        </Provider>
    </div>
  );
}

export default App;
