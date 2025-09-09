import React, { Suspense} from 'react'
import {  Routes, Route, Navigate } from "react-router-dom";
import routes from './routes.js';
import Loader from './components/loader/Loader'
import Private from './Private.js';
import Login from './pages/login/Login.jsx';



export default function Routing() {

  return (  
      <Routes>
        <Route element={<Private />}>
        {routes.map(({ path, Component } ) => (
          <Route path={path} key={path} element={<Suspense fallback={<Loader />}>{Component}</Suspense>} />
       ))}
        </Route>
       <Route path="/" element={<Login />} />
      </Routes> 
  )
}

