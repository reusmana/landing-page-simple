/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { describe, it } from "node:test";

import { useQuery } from "@apollo/client";
import { GET_STATION, STATION_DETAIL } from "@/graphql/queries";
import { Station } from "@/app/getDetails";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apolloClient";
describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    // const data = {
    //   stationId: "10007",
    // };
    // render(apolloClient(Station));
    // const { data } = useQuery(GET_STATION);
    // console.log(data);

    // const heading = screen.getByRole("heading", {
    //   name: /welcome to next\.js!/i,
    // });

    console.log("re");
    apolloClient;
  });
});
