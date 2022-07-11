
import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import speech from 'speech-js'
import axios from 'axios'


//The virtual agent says hello to the user
const saludar=()=>{
  
  speech.synthesis("Hola soy Noa tu asistente virtual de Recursos Humanos, ¿Qué necesitas?", 'es-ES') // speech synthesis module

  const recognition = speech.recognition('es-ES') // speech recognition module
  recognition.start()
  recognition.onresult = e => {
  let result = e.results[0][0].transcript
  speech.synthesis(result, 'es-ES')
  }
}
//The virtual agent says goodbye to the user
const despedida=()=>{
  
  speech.synthesis(`Adiós, ¡estoy para lo que necesites!`, 'es-ES') // speech synthesis module

  const recognition = speech.recognition('es-ES') // speech recognition module
  recognition.start()
  recognition.onresult = e => {
  let result = e.results[0][0].transcript
  speech.synthesis(result, 'es-ES')
  }
}

//error message
const errorMessage=()=>{
  
  speech.synthesis(`Vaya... Estoy teniendo problemas de soporte del navegador`, 'es-ES') // speech synthesis module

  const recognition = speech.recognition('es-ES') // speech recognition module
  recognition.start()
  recognition.onresult = e => {
  let result = e.results[0][0].transcript
  speech.synthesis(result, 'es-ES')
  }
}
//search employee
const busqueda=(persona)=>{
  let resultadoEmpleados;
  let primeraLetra=persona.substring(0,1).toUpperCase();
  let restoPalabra=persona.substring(1,persona.length);
  let palabraTotal=primeraLetra+restoPalabra;
  console.log("Apellidos : " +palabraTotal);
  axios.get('http://localhost:3500/api/ver/'+palabraTotal)
  .then(res=>{
    
    resultadoEmpleados=(res.data.resultado);
    console.log(resultadoEmpleados)
    for(let i of resultadoEmpleados){
      
      speech.synthesis("Nombre del empleado "+i.nombre+". Apellidos del empleado "+i.apellidos+". Departamento "+i.departamento+". Fecha de ingreso en la empresa: "+i.fecha_alta+". Número de la seguridad social: "+i.seguridadsocial+". Ofício "+i.oficio+". Salario "+i.salario+"euros . Teléfono de contacto "+i.telefono)
      
      const recognition = speech.recognition('es-ES') 
      recognition.start()
      recognition.onresult = e => {
      let result = e.results[0][0].transcript
      speech.synthesis(result, 'es-ES')
      }
    }
    
  });
  
  
}
//The virtual agent listens the user
//Comamnds are the intents, the training to the bot
const Dictaphone = () => {
  
  const [message, setMessage] = useState('')


  console.log("Listening")

  
  const commands = [
    {
      command: 'Busca el empleado *',
      callback: (persona) => setMessage(busqueda(persona))
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
      command: 'Eliminar el empleado *',
      callback: (empleado) => setMessage(`empleado ${empleado} eliminado`)
    },
    {
      command: ['hola', 'saludos', 'buenos días','buenas tardes', 'Noa'],
      callback: () => setMessage(saludar()),
      
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
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <p>{message}</p>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone