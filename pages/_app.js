
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import fetch from "cross-fetch";


const createApolloClient = () => {
  
  return new ApolloClient({
    link: new HttpLink({ 
      uri: 'YOUR GRAPHQL FOR AURA ENDPOINT',
      headers:  { 'content-type':'application/json',
      'x-api-key': 'YOUR API KEY FOR ENDPOINT'
      },
      fetch,
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};


export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

