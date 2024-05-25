import React from "react";
import { useQuery } from "@apollo/client";

import { STATION_DETAIL } from "@/graphql/queries";

export function Station({ stationId }) {
  const { loading, error, data } = useQuery(STATION_DETAIL, {
    variables: { stationId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return <p>{JSON.stringify(data)}</p>;
}
