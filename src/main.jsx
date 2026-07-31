


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import {config} from "./components/configs/web3.config.js"


const queryClient = new QueryClient()
const root = createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
    // <BrowserRouter>
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <StrictMode>
    <App />
  </StrictMode>,
    </QueryClientProvider>
    </WagmiProvider>    
    );
