"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import * as client from "../client";
export default function Users() {
 const [users, setUsers] = useState<any[]>([]);
 const [role, setRole] = useState("");
const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

 const fetchUsers = async () => {
   const users = await client.findAllUsers();
   setUsers(users);
 };
 useEffect(() => {
   fetchUsers();
 }, []);
 return (
   <div>
     <h3>Users</h3>
     <PeopleTable users={users} fetchUsers={fetchUsers} />
   </div>
);}
