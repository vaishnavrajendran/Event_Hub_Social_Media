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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    scrollableContainer: {
      maxHeight: '100vh',
      overflow: 'auto',
    },
  });

const Sidebar = ({children}) => {

    const classes = useStyles();
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh />
        },
        {
            path:"/about",
            name:"Host Requests",
            icon:<FaUserAlt />
        },
        {
            path:"/reports",
            name:"Post Reports",
            icon:<FaRegChartBar />
        },
        // {
        //     path:"/comment",
        //     name:"Comment",
        //     icon:<FaCommentAlt />
        // },
        {
            path:"/user-reports",
            name:"User Reports",
            icon:<FaRegChartBar />
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaShoppingBag />
        },
        {
            path:"/productList",
            name:"Product List",
            icon:<FaThList />
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none", fontSize:"1.25rem"}} className="logo">Event Hub</h1>
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
           {/* <main>{toggled === 1 ? <Dashboard/>  : ""}
           {toggled === 2 ? <HostRequests/> : ""}
           {toggled === 3 ? <MainPage/> : ""}
           {toggled === 4 ? <Comment/> : ""}
           {toggled === 5 ? <Product/> : ""}
           {toggled === 6 ? <ProductList/> : ""}
           {console.log(toggled)}
           </main> */}
           <main className={classes.scrollableContainer}>{children}</main>
        </div>
    );
};

export default Sidebar;