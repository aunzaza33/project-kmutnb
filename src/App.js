import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import NavbarComp from './component/NavbarComp';
import Sidebardata from './component/Sidebardata';
import Signin from './component/Signin';
import Reportrepair from './component/reportrepair';


function App() {
  const displayname = sessionStorage.getItem('displayname');
  const accountType = sessionStorage.getItem('account_type');
  
  {
    return <Sidebardata />;
  }
}

export default App;
