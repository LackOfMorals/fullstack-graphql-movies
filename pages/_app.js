
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
      uri: 'https://02b6eba2.21d7491fb5115cfb6434fca95c37b671.graphql.neo4j.io/graphql/',
      headers:  { 'content-type':'application/json',
      'x-api-key': 'vdyrYzxDkMkqM1BzCLoiMJzkjUxs4K30'
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

