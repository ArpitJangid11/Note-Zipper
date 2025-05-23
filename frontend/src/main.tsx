import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './bootstrap.min.css'
// import reportWebVitals from "reportWebVitals"
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from "./store.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
