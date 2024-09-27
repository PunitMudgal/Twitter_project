import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Authentication from "./Authentication";
import Register from "../authentication/Register";

export function AppLayoutAuthentication() {
  return (
    <>
      <div className="flex z-10">
        <Authentication />
        <div className="bg-blue6 flex-grow">{<Outlet />}</div>
      </div>
    </>
  );
}

export function AppLayoutRegister() {
  return (
    <>
      <Register />
      <Outlet />
    </>
  );
}

export function AppLayoutMain() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
