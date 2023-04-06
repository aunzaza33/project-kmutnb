import { useState, useEffect } from 'react';
import './Sidebardata.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import Reportrepair from './reportrepair';
import Home from './Home';
import Repair from './repair';
import Room from './room';

function Sidebardata() {
  const displayname = sessionStorage.getItem('displayname');
  const [repairType, setRepairType] = useState('');


  useEffect(() => {
    const storageRepairType = sessionStorage.getItem('repairType');
    if (storageRepairType) {
      setRepairType(storageRepairType);
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname.startsWith('/repair')) {
      const type = window.location.pathname.split('/')[2];
      setRepairType(type);
      sessionStorage.setItem('repairType', type);
    }
  }, [window.location]);
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  }
  
  if(!displayname){
    return (
      <BrowserRouter>
        <div class="sidenav">
        <a class="navbar-brand" ><NavLink to="/"></NavLink></a>
          <a class="navbar-brand" ><NavLink to={`/repair/${repairType}`}>แจ้งซ่อม</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/room">แจ้งย้าย</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/reportrepair">แจ้ง</NavLink></a>
        </div>
        <div class="content">
          <Routes>
            <Route path='/' element={<Room />}></Route>
            <Route path='/repair/:type' element={<Repair />}></Route>
            <Route path='/room' element={<Room />}></Route>
            <Route path='/reportrepair' element={<Reportrepair />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
  else{
    return (
      <BrowserRouter>
        <div class="sidenav">
          <a class="navbar-brand" ><NavLink to={`/repair/${repairType}`}>แจ้งซ่อม</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/room">แจ้งย้าย</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/reportrepair">แจ้ง</NavLink></a>
          <a class="navbar-brand" onClick={handleLogout}><NavLink to="/signin">LogOut</NavLink></a>
        </div>
        <div class="content">
          <Routes>
            <Route path='/repair/:type' element={<Repair />}></Route>
            <Route path='/room' element={<Room />}></Route>
            <Route path='/reportrepair' element={<Reportrepair />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
  
}

export default Sidebardata;
