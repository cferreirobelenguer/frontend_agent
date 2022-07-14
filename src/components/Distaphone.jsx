
import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import imagenPortada from '../assets/images/portada.jpg'
import { salarioMayor, salarioMenor, saludar, despedida, errorMessage, busqueda, eliminarEmpleado, ayuda, buscarEmpleadoAntiguo, buscarEmpleadoReciente} from './funciones'


//Comamnds are the intents, the training to the bot
const Dictaphone = (props) => {
  
  const [message, setMessage] = useState('')


  console.log("Listening")

  
  const commands = [
    
    {
      command: ['Busca la incorporación más reciente', 'Busca el empleado más nuevo', 'empleado más reciente', 'incorporación más reciente', 'empleado nuevo', 'empleado más nuevo'],
      callback: (nombre,apellidos) => 
        setMessage(buscarEmpleadoReciente())
    },
    {
      command: ['Busca la incorporación más antigua', 'Busca el empleado más antiguo', 'empleado más antiguo', 'incorporación más antigua', 'empleado antiguo', 'empleado más antiguo', 'primer empleado de la compañía', 'primer empleado'],
      callback: (nombre,apellidos) => setMessage(buscarEmpleadoAntiguo()),
    }, 
    {
      command: 'Busca el empleado * *',
      callback: (nombre,apellidos) => setMessage(busqueda(nombre,apellidos)),
    },
    
    {
      command: ['adiós', 'hasta otra', 'luego hablamos','hasta luego'],
      callback: () => setMessage(despedida())
    },
    {
      command: 'Introduce los datos del siguiente empleado: nombre * , apellidos * , oficio * , departamento * , fecha de alta * , salario * , seguridad social * , teléfono * ',
      callback: (nombre, apellidos, oficio, departamento, fecha_alta, salario, seguridadsocial, telefono  ) => setMessage(`#1: ${nombre}, #2: ${apellidos}`)
    },
    {
      command:  ['Eliminar el empleado * *', 'Borra el empleado * *', 'elimina * *','borra * *', 'quita el empleado * *', 'quita * *'],
      callback: (nombre,apellidos) => setMessage(eliminarEmpleado(nombre,apellidos))
    },
    {
      command: ['muestra el salario más alto','busca el salario más alto', 'salario mayor', 'salario más alto','muestra salario más alto', 'muestra salario mayor'],
      callback: ()=>setMessage(salarioMayor())

    },
    {
      command: ['muestra el salario más bajo','busca el salario más bajo', 'salario menor', 'salario más bajo','muestra salario más bajo', 'muestra salario menor'],
      callback: ()=>setMessage(salarioMenor())

    },
    {
      command: ['hola', 'saludos', 'buenos días','buenas tardes', 'Noa'],
      callback: () => setMessage(saludar()),
      
      matchInterim: true
    },
    {
      command: ['ayuda', 'necesito ayuda', 'soporte', 'quiero ayuda', 'quiero pedir ayuda', 'help'],
      callback: () => setMessage(ayuda()),
      
      matchInterim: true
    },
    
    {
      command: 'Reiniciar',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]
  
  
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

  if (!browserSupportsSpeechRecognition) {
    return errorMessage();
  }

  

  return (
    <div className="contenedor" id="funciones">
      <div className="portadaTexto">
      <div className="portada" data-aos="fade-left">
        <h1>Más tiempo<br></br>para<br></br>lo que<br></br>importa</h1>
      </div>
      <div className='parrafo'>
        <p>{props.subtitulo}<br></br></p>
      </div>
      <div className="boton">
        <button className="button" onClick={SpeechRecognition.startListening}>Probar gratis</button>
        <p>{message}</p>
        <p>{transcript}</p>
    
      </div>
      </div>
      <div className="imagen">
        <img src={imagenPortada} width="500" height="400" className="img-fluid" alt="portada"/>
      </div>
    </div>
  )
}
export default Dictaphone