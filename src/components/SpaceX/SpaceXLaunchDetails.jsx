import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getLaunchDetailsQuery, runGqlQuery } from "../../actions/space_x";

export default function SpaceXLaunchDetails(props) {
  const { launchId } = props;
  console.log(launchId);
  // GQL Query
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [
      "launch",
      {
        launchId,
      },
    ],
    queryFn: () =>
      runGqlQuery(getLaunchDetailsQuery, {
        launchId,
      }).then((res) => res.data),
    enabled: !!launchId,
  });

  if (isError) {
    return <p className="text-red-800">Error: {JSON.stringify(error)}</p>;
  }

  const launch = data?.data?.launch;
  if (!launch || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-2 flex flex-col items-center justify-center">
      <div className="bg-white rounded p-4 sm:p-2">
        <p>Launch ID: {launchId}</p>
        <p>Rocket Name: {launch.rocket.rocket_name}</p>
        <p>{launch.details}</p>
      </div>
    </div>
  );
}
