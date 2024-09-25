import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import TableSelection from "./pages/TableSelection/TableSelection";
import FoodSelection from "./pages/FoodSelection/FoodSelection";
import Modal from "react-modal";
import BillDetail from "./pages/BillDetail/BillDetail";
import BillManagement from "./pages/Managements/BillManagement/BillManagement";
import Login from "./pages/Login/Login";
import RestaurantManagement from "./pages/Managements/RestaurantManagement/RestaurantManagement";
import EmployeeManagement from "./pages/Managements/EmployeeManagement/EmployeeManagement";
import TableManagement from "./pages/Managements/TableManagement/TableManagement";
import FoodManagement from "./pages/Managements/FoodManagement/FoodManagement";

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table' element={<TableSelection />} />
          <Route path='/menu' element={<FoodSelection />} />
          <Route path='/bill/:id' element={<BillDetail />} />
          <Route path='/bill-management/:id' element={<BillManagement />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/management' element={<RestaurantManagement />} />
          <Route
            path='/management/employees'
            element={<EmployeeManagement />}
          />
          <Route path='/management/tables' element={<TableManagement />} />
          <Route path='/management/foods' element={<FoodManagement />} />
          <Route path='/management/bills' element={<BillManagement />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
