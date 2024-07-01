import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { ConversationContextProvider } from './context/ConversationContext.tsx'
import { UserContextProvider } from './context/UserContext.tsx'
import { MessagesContextProvider } from './context/MessageContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MessagesContextProvider>
        <UserContextProvider>
          <ConversationContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </ConversationContextProvider>
        </UserContextProvider>
      </MessagesContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
