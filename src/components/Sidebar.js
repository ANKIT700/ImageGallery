import React from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";

const Sidebar = ({searchHandler}) => {
  return (
    <div className="sidebar">
      <ol>
      <li className="fw-bold" to="/">
        CATEGORIES
      </li>
      <li onClick={()=>searchHandler('backgrounds')}>Backgrounds</li>
      {/* <li onClick={()=>searchHandler('fashion')} >Fashion</li> */}
      <li onClick={()=>searchHandler('nature')}>Nature</li>
      <li onClick={()=>searchHandler('science')}>Science</li>
      <li onClick={()=>searchHandler('education')}>Education</li>
      <li onClick={()=>searchHandler('feelings')}>Feelings</li>
      <li onClick={()=>searchHandler('health')}>Health</li>
      <li onClick={()=>searchHandler('people')}>People</li>
      <li onClick={()=>searchHandler('places')}>Places</li>
      <li onClick={()=>searchHandler('animals')}>Animals</li>
      <li onClick={()=>searchHandler('industry')}>Industry</li>
      <li onClick={()=>searchHandler('computer')}>Computer</li>
      <li onClick={()=>searchHandler('food')}>Food</li>
      <li onClick={()=>searchHandler('sports')}>Sports</li>
      <li onClick={()=>searchHandler('travel')}>Travel</li>
      <li onClick={()=>searchHandler('buildings')}>Buildings</li>
      <li onClick={()=>searchHandler('business')}>Business</li>
      <li onClick={()=>searchHandler('music')}>Music</li>
      </ol>
     
      
    </div>
  );
};

export default Sidebar;
