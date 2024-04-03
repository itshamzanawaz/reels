import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://ap-south-1.cdn.hygraph.com/content/clujvkvwf02m608w61emr9sh5/master',
  cache: new InMemoryCache(),
});

export default client;