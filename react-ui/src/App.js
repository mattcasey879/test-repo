import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Employees from "./components/pages/Employees";
import Header from "./components/Header";
import CreateEditEmployee from "./components/pages/Create-Edit-Employee";
import AuthRouteGuard from "./components/guards/AuthRouteGuard";
import AdminsOnlyGuard from "./components/guards/AdminsOnlyGuard";
import { ToastProvider } from "./contexts/ToastContext";
import Login from "./components/pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <ToastProvider setLoggedIn={setLoggedIn}>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setEditMode={setEditMode}/>
        <Routes>
          <Route
            index
            element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="employees"
            element={
              <AuthRouteGuard>
                <Employees/>
              </AuthRouteGuard>
            }
          />
          {["new-employee", "employees/edit/:id"].map((path, index) => (
            <Route
            key={index}
              path={path}
              element={
                <AuthRouteGuard>
                  <AdminsOnlyGuard>
                    <CreateEditEmployee editMode={editMode} setEditMode={setEditMode}/>
                  </AdminsOnlyGuard>
                </AuthRouteGuard>
              }
            ></Route>
          ))}
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
