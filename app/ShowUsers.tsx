"use client";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ShowUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/getUsers")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
