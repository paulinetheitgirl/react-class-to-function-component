const axios = require("axios");

const graphQLEndpoint = `https://spacex-production.up.railway.app/`;

export const getLaunchesQuery = `
  query getLaunchesQuery($limit: Int, $sort: String) {
  launches(limit: $limit, sort: $sort) {
    id
    mission_name
    mission_id
    launch_date_local
  }
}
`;

export const getLaunchDetailsQuery = `
query getLaunchDetailsQuery($launchId: ID!) {
  launch(id: $launchId) {
    details
    rocket {
      rocket_name
    }
  }
}
`;

export const runGqlQuery = (queryFunction, variables) => {
  return axios.post(graphQLEndpoint, {
    query: queryFunction,
    variables
  });
};