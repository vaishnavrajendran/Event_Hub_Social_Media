import Analytics from 'pages/Analytics';
import Comment from 'pages/Comment';
import Dashboard from 'pages/Dashboard';
import Product from 'pages/Product';
import ProductList from 'pages/ProductList';
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import HostRequests from '../pages/HostRequests'


const Sidebar = ({children}) => {
    console.log('Child',children)
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [toggled,setToggled] = useState(0);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh onClick={() => setToggled(1)}/>
        },
        {
            path:"/about",
            name:"Host Requests",
            icon:<FaUserAlt onClick={() => setToggled(2)}/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar onClick={() => setToggled(3)}/>
        },
        {
            path:"/comment",
            name:"Comment",
            icon:<FaCommentAlt onClick={() => setToggled(4)}/>
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaShoppingBag onClick={() => setToggled(5)}/>
        },
        {
            path:"/productList",
            name:"Product List",
            icon:<FaThList onClick={() => setToggled(6)}/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none", fontSize:"1.25re"}} className="logo">Event Hub</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{toggled === 1 ? <Dashboard/>  : ""}
           {toggled === 2 ? <HostRequests/> : ""}
           {toggled === 3 ? <Analytics/> : ""}
           {toggled === 4 ? <Comment/> : ""}
           {toggled === 5 ? <Product/> : ""}
           {toggled === 6 ? <ProductList/> : ""}
           {console.log(toggled)}
           </main>
        </div>
    );
};

export default Sidebar;