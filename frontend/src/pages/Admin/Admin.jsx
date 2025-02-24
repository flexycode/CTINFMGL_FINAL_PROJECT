import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';
import Admin_Add from '../../components/Admin-Add/Admin_Add';
import Admin_Nav from '../../components/Admin_Nav/Admin_Nav';
import Search from '../../components/Search/Search';
const Admin = ({handleLogOut}) => {
 
  return (
    <>
    <Admin_Nav handleLogOut={handleLogOut} />
    <section id="add">
    <Admin_Add />
    </section>
           <section id="search">
            <Search />
            </section>
   </>
  );
};

export default Admin;
