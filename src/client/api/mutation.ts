import { gql } from "@apollo/client";

const CREATE_USER: any = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id
      name
      age
    }
  }
`;

export { CREATE_USER };
