import { gql } from "@apollo/client";
const GET_LOCATIONS: any = gql`
  query {
    getAllUsers {
      id
      name
      age
    }
  }
`;

export { GET_LOCATIONS };
