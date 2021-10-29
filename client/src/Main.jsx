import React from "react";
import { Route } from "react-router-dom";
import StoreHome from "./pages/StoreHome";
import AdminHome from "./pages/AdminHome";
import AdminPetProfile from "./pages/AdminPetProfile";
import AddPet from "./pages/AddPet";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={StoreHome}></Route>
      <Route exact path="/admin" component={AdminHome}></Route>
      <Route exact path="/admin/petProfile/:id" component={AdminPetProfile}></Route>
      <Route exact path="/admin/addPet" component={AddPet}></Route>
    </div>
  );
};

export default Main;
