import axios from "axios";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import CreateNews from "./CreateNews";
import NewsList from "./NewsList";
import UpdateNews from "./UpdateNews";
import ManageCategories from "./ManageCategories";
import ManageTags from "./ManageTags";
import ManageRole from "./ManageRole";
import ManageUser from "./ManageUser";
import Settings from "./Settings";
import SupportForm from "./Support";

function Admin() {
  const [USERID, setuserid] = useState("");
  const [role, setRole] = useState(() => {
    // Retrieve the user role from localStorage when the component mounts
    return localStorage.getItem("userRole") || "";
  });
  // here we will check first whether the user has the right to access the admin panel or not
  axios
    .get("http://localhost:8080/api/isAuth", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    // here the userid will be coming from the /api/isAuth endpoint and we are gonna create a controller function for that.
    .then((response) => {
      console.log("response is: ", response.data.userid);
      // print the Role property of the response data
      console.log("response.data: ", response.data);
      if (response.data.Role) {
        setuserid(response.data.userid);
        setRole(response.data.Role);
        // Save the user role to the local storage
        localStorage.setItem("userRole", response.data.Role);
      } else {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div
      className="flex flex-col min-h-screen max-h-full dashboard w-full"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          {/* this div will hold all the routes related to the admin banel */}
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news-management/create" element={<CreateNews />} />
            <Route path="/news-management/NewsList" element={<NewsList />} />
            <Route
              path="/news-management/manage-categories"
              element={<ManageCategories />}
            />
            <Route
              path="/news-management/manage-tag"
              element={<ManageTags />}
            />
            <Route
              path="/user-management/manage-role"
              element={<ManageRole />}
            />
            <Route
              path="/user-management/manage-user"
              element={<ManageUser />}
            />
            <Route path="/settings" element={<Settings USERID={USERID} />} />
            <Route path="/help" element={<SupportForm userRole={role} />} />
            <Route
              path="/news-management/update/:id"
              element={<UpdateNews />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Admin;
