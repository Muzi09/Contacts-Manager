import React from "react";
import Login from "./Login/Login";
import Signup from "./SignUp/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Contacts_page from "./Contacts-Page/Contacts-Page"
import ImportComplete from "./Import-Complete/Import-Complete";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Login></Login>}/>
          <Route path="/signup"  element={<Signup></Signup>}/>
          <Route path="/contactpage"  element={<Contacts_page></Contacts_page>}/>
          <Route path="/suc" element={<ImportComplete></ImportComplete>}/>
         </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
