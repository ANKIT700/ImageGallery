import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const categories = [
  "cars",
  "backgrounds",
  "fashion",
  "science",
  "nature",
  "education",
  "feelings",
  "health",
  "people",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "travel",
  "buildings",
  "business",
  "music",
];
const Sidebar = ({ searchHandler }) => {
  return (
    <div className="sidebar">
      <ol>
        <li className="fw-bold" to="/">
          CATEGORIES
        </li>
        {categories.map((category) => {
          return <li onClick={() => searchHandler(category)}>{category}</li>;
        })}
      </ol>
    </div>
  );
};

export default Sidebar;
