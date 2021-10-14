import React from "react";
import { Route } from "react-router-dom";
import StoreHome from "./pages/StoreHome";
import AdminHome from "./pages/AdminHome";

const Main = () => {
  return (
    <div>
      <Route exact path="/">
        <StoreHome />
      </Route>
      <Route exact path="/admin">
        <AdminHome />
      </Route>
    </div>
  );
};

export default Main;