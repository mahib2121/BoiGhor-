import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/Router.jsx'
import AuthProvider from './Firebase/AuthProvider.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'sweetalert2/src/sweetalert2.scss'
import { Provider } from 'react-redux'
import store from './redux/store.js'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </Provider>,
)