import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from './App'

import './assets/styles/index.sass'


if (typeof window !== 'undefined')
  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
      <App />
    </StrictMode>,
  )
