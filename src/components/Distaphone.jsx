
import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import speech from 'speech-js'
import axios from 'axios'
import imagenPortada from '../assets/images/portada.jpg'



const salarioMayor=()=>{
  
    let resultadoEmpleados;
    
    axios.get('http://localhost:3500/api/buscarmax/')
    .then(res=>{
    
      resultadoEmpleados=(res.data.resultadoSalarios);
      let contador=0;
      for(let i of resultadoEmpleados){
        contador++;
        console.log(i.salario)
        
        if(contador===1){
          console.log(i.salario)
          speech.synthesis("El salario más alto es "+i.salario +"euros que corresponde a "+i.nombre+ i.apellidos) // speech synthesis module

          const recognition = speech.recognition('es-ES') // speech recognition module
          recognition.start()
          recognition.onresult = e => {
            let result = e.results[0][0].transcript
            speech.synthesis(result, 'es-ES');
          }
        }
      }
    });
}

const salarioMenor=()=>{
  
  let resultadoEmpleados;
  
  axios.get('http://localhost:3500/api/buscarmin/')
  .then(res=>{
  
    resultadoEmpleados=(res.data.resultadoSalarios);
    let contador=0;
    for(let i of resultadoEmpleados){
      contador++;
      console.log(i.salario)
      
      if(contador===1){
        console.log(i.salario)
        speech.synthesis("El salario más bajo es "+i.salario +"euros que corresponde a "+i.nombre+ i.apellidos) // speech synthesis module

        const recognition = speech.recognition('es-ES') // speech recognition module
        recognition.start()
        recognition.onresult = e => {
          let result = e.results[0][0].transcript
          speech.synthesis(result, 'es-ES');
        }
      }
    }
  });
}
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
  
  speech.synthesis(`Adiós, ¡rt
  estoy para lo que necesites!`, 'es-ES') // speech synthesis module

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
const busqueda=(nombre,apellidos)=>{
  let resultadoEmpleados;
  
  axios.get('http://localhost:3500/api/ver/'+nombre+'&'+apellidos)
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
//delete employee
const eliminarEmpleado=(nombre,apellidos)=>{
  let resultadoEliminacion;
  
  axios.delete('http://localhost:3500/api/delete/'+nombre+'&'+apellidos)
  .then(res=>{
    
    resultadoEliminacion=(res.data.resultado);
    console.log(resultadoEliminacion)
    
    speech.synthesis(`El empleado ${nombre} ${apellidos} ha sido eliminado del sistema`)
      
    const recognition = speech.recognition('es-ES') 
    recognition.start()
    recognition.onresult = e => {
    let result = e.results[0][0].transcript
    speech.synthesis(result, 'es-ES')
    }
    
    
  });
  
  
}
//help to the user
const ayuda=()=>{
  speech.synthesis(`Puedes pedirme que busque datos de los trabajadores en la base de datos`)
      
  const recognition = speech.recognition('es-ES') 
  recognition.start()
  recognition.onresult = e => {
  let result = e.results[0][0].transcript
  speech.synthesis(result, 'es-ES')
  }
}

//Comamnds are the intents, the training to the bot
const Dictaphone = (props) => {
  
  const [message, setMessage] = useState('')


  console.log("Listening")

  
  const commands = [
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
      <div className="portada">
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