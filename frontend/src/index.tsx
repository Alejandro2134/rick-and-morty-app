import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { BrowserRouter } from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { ApolloClient, HttpLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_API }),
  cache: new InMemoryCache()
})

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)
