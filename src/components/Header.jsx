import React from "react";
import logo from '../assets/images/logo.gif'
import menuhamburguesa from '../assets/images/hamburguesa.png'

const Header=()=>{

    return(
    <div className='Navegacion'>
        <div className="contenidoNavegacion">
            <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="logo">
                <img src={logo} width="180" height="180" className="img-fluid" alt="logo"/>
            </div>
    
        <div className="container-fluid">
    
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#funciones">Pruébanos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#porque">Funciones</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#precios">Precios</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#contacto">Contacto</a>
                </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
    <div className="logoResponsive">
        <img src={logo} width="180" height="180" className="img-fluid" alt="logo"/>
    </div>
    
    <div className="contenidoNavResponsive">
            <input type="checkbox"/>
                <i className="fas fa-bars"></i>
                <i className="fas fa-times"></i><img id="hamburguesa" src={menuhamburguesa} width="80" heigth="80" className="img-fluid" alt="menu hamburguesa"/>
            <nav>
            <ul>
                <li><a className="nav-link active" aria-current="page" href="#funciones">Pruébanos</a></li>
                <li><a className="nav-link active" aria-current="page" href="#porque">Funciones</a></li>
                <li><a className="nav-link active" aria-current="page" href="#precios">Precios</a></li>
                <li><a className="nav-link active" aria-current="page" href="#contacto">Contacto</a></li>        
            </ul>
            </nav>
    </div>
    <hr className="linea"></hr>
    </div>
    
    
    );
}
    export default Header;