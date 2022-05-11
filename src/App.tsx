import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Form from "./components/form";
import FieldArray from "./components/fieldArray";
import Layout from "./components/layout";
import "./App.css";

type rating = {
  rate: number;
  count: number;
};
export type product = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: rating;
  title: string;
};
export function fetchApi() {
  const response = fetch("https://fakestoreapi.com/products?limit=5")
    .then((res) => res.json())
    .then((json) => json);
  return response;
}

function App() {
  let navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/form/${id}`);
  };
  return (
    <div>
      <Routes>
        <Route index element={<Home onHandleEdit={handleEdit} />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
