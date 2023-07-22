// App.tsx
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import UserTable from "./UserTable";

const App: React.FC = () => {
  return (
    <Router>
    <div className="container mt-4">
      <h1>Lista de Usuarios</h1>
      <UserTable />
    </div>
    </Router>
  );
};

export default App;
