
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
  
  speech.synthesis(`Adiós, ¡Sabes que estoy para lo que necesites!`, 'es-ES') // speech synthesis module

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
//The virtual agent listen the user
//Comands are the intents, the training to the bot
const Dictaphone = () => {

  const [message, setMessage] = useState('')
  const [busca, setBusca] = useState([]);

  const busqueda=(persona)=>{
    console.log("Apellidos : " +persona);
    axios.get('http://localhost:3500/api/ver',{
      apellidos:persona
    })
    .then(res=>{
      setBusca(res.data.resultado);
    })
    console.log(busca);
  
  }

  console.log("Listening")
  
  
  const commands = [
    {
      command: 'Busca *',
      callback: (persona) => setMessage(busqueda(persona))
    },
    {
      command: ['adiós', 'hasta otra', 'luego hablamos','hasta luego'],
      callback: () => setMessage(despedida())
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
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