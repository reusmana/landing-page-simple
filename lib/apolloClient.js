import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useRouter } from "next/navigation";
import nextWithApollo from "next-with-apollo";

const apolloClient = nextWithApollo(
  ({ inisialState, headers }) => {
    return new ApolloClient({
      ssrMode: typeof window === "undefined",
      link: new HttpLink({
        uri: "https://staging.voltron.id/v1/graphql",
      }),
      headers: {
        ...headers,
      },
      cache: new InMemoryCache().restore(inisialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      //   const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);

export default apolloClient;
