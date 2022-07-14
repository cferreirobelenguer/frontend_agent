import React from 'react';
import porqueImagen from '../assets/images/porqueImagen.jpg'

const Porque=()=>{
    return(
        <div id="porque">
            <div className="motivos">
                <div className="tituloPorque" data-aos="fade-right">
                    <h4><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clipboard-data" viewBox="0 0 16 16">
                    <path  d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                    <path  d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path  d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>&nbsp;&nbsp;&nbsp;<b>Una plataforma para almacenar tus bases de datos de RRHH</b></h4>
                    </div>
                <div className="subtituloPorque">
                    <h6>Gestión de personal</h6>
                </div>
                <div className="contenidoPorque">
                    <p>Mantén todos los datos y documentos de tus empleados centralizados y gestiona los procesos de onboarding</p>
                </div>

            </div>
            <div className="imagenPorque">
                <img src={porqueImagen} width="500" height="500" className="img-fluid" alt="foto componente porque"/>
            </div>
            
        </div>
    );
}
export default Porque;