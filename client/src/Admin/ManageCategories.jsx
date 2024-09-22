import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "react-feather";
import CategoryForm from "./CategoryForm";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/AllCategoriesWithSubCategories`
      );
      // you can replace with your api endpoint
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories: ", error.message);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleDeleteCategory = async (categoryId) => {
    console.log("categoryId is ", categoryId);
    try {
      await axios.delete(
        `http://localhost:8080/api/deleteCategories/${categoryId}`
      );
      // Replace with your API endpoint
      // Refresh the categorise after deletion
      fetchCategories();
    } catch (error) {
      console.log("Error deleting category: ", error.message);
    }
  };
  // const handleDeleteSubCategory = async (categoryId, subcategoryId) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:8080/api/categories/${categoryId}/subcategories/${subcategoryId}`
  //     );
  //     // Replace with your api endpoint
  //     // Refresh the categories after deletion
  //     fetchCategories();
  //   } catch (error) {
  //     console.log("Error deleting subcategory: ", error.message);
  //   }
  // };
  const handleDeleteSubCategory = async (categoryId, subcategoryId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/categories/${categoryId}/subcategories/${subcategoryId}`
      );
      // Refresh the categories after deletion
      fetchCategories();
    } catch (error) {
      console.error(
        "Error deleting subcategory:",
        error.response?.data || error.message
      );
    }
  };
  // code from claude

  const handleAddCategory = async ({
    categoryName,
    subcategoryName,
    selectedParentCategory,
    // these three props are added with the handleaddCategory using the usestate and they are accessible throught the onsubmit
  }) => {
    console.log({
      name: categoryName,
      subcategories: subcategoryName,
      parentCategory: selectedParentCategory,
    });
    try {
      await axios.post("http://localhost:8080/api/addCategories", {
        name: categoryName,
        subcategories: subcategoryName,
        parentCategory: selectedParentCategory,
      });
      // Refresh the categories after addition
      fetchCategories();
    } catch (error) {
      console.error("Error adding category: ", error.message);
    }
  };
  return (
    <div className="mt-24 mx-20 bg-white px-4 rounded-md drop-shadow-md">
      <h1 className="text-2xl font-semibold my-4">Manage Categories</h1>
      <CategoryForm categories={categories} onSubmit={handleAddCategory} />
      <ul className="mt-4">
        <h1 className="text-2xl font-semibold my-4">Category List</h1>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((category) => (
            <li className="mb-4" key={category._id}>
              <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                <span className="text-lg font-semibold">{category.name}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <ul className="ml-4">
                {category.items.map((subcategory) => (
                  <li className="flex items-center text-gray-600">
                    <span>{subcategory.name}</span>
                    <button
                      className="text-red-500 ml-2 bg-none"
                      onClick={() =>
                        handleDeleteSubCategory(category._id, subcategory._id)
                      }
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManageCategories;
