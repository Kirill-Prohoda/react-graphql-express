import { useQuery, gql, useMutation } from "@apollo/client";
import * as React from "react";
import { useState, useEffect } from "react";
import { CREATE_USER } from "./api/mutation";
import { GET_LOCATIONS } from "./api/query";

/* HOOK REACT EXAMPLE */
const App = () => {
  const { data, loading, error } = useQuery(GET_LOCATIONS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers]: any = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  if (loading) <h1 className="text-primary text-center">LOADING...</h1>;

  const addUser = async (e: any) => {
    e.preventDefault();

    const result = await newUser({
      variables: {
        input: {
          name,
          age: Number(age),
        },
      },
    });

    setUsers((users: any) => [...users, result.data.createUser]);
    setAge(0);
    setName("");
  };

  return (
    <main className="container my-5">
      <h1 className="text-primary text-center">Users</h1>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button onClick={addUser}>add</button>
      </form>
      <ul>
        {users.map((user: any) => {
          return (
            <li>
              id: {user.id} name: {user.name}, age: {user.age}
            </li>
          );
        })}
      </ul>
    </main>
  );
};
export default App;
