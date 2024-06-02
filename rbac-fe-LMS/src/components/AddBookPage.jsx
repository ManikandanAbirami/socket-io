import React from "react";
import BookForm from "./BookForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBookPage() {
  const navigate = useNavigate();
  const handleAddBook = async (formData) => {
    try {
      await axios.post("http://localhost:3000/api/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/books");
    } catch (error) {
      console.error("Error adding book", error);
    }
  };
  return (<BookForm onSubmit={handleAddBook}></BookForm>);
}

export default AddBookPage;
