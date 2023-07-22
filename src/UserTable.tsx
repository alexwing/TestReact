import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { getUsers } from "./api/api";
import User from "./interfaces/users";
import { Link } from "react-router-dom";
import UserDetail from "./UserDetail";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);


  useEffect(() => {
    if (window.location.pathname.includes("/users/")) {
      setId(parseInt(window.location.pathname.split("/")[2]));
    }
  }, []);

  const columns = [
    { dataField: "id", text: "ID" },
    { dataField: "name", text: "Name" },
    { dataField: "username", text: "Username" },
    { dataField: "email", text: "Email" },
    { dataField: "address.city", text: "City" },
    { dataField: "phone", text: "Phone" },
    { dataField: "website", text: "Website" },
    {
      dataField: "details",
      text: "Detalles",
      formatter: (cell: any, row: User) => {
        return (
          <Link
            to={`/users/${row.id}`}
            onClick={() => {
              setId(row.id);
            }}
          >
            Detalles
          </Link>
        );
      },
    },
  ];

  const paginationOptions = {
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={users}
        columns={columns}
        pagination={paginationFactory(paginationOptions)}
      />
      <UserDetail id={id} />
    </div>
  );
};

export default UserTable;
