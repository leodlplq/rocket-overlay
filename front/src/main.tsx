import App from '#/App'
import { queryClient } from '#/api/queryClient'
import AuthProvider from '#/context/AuthProvider'
import '#/style.css'
import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  )
}
