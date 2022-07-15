import axios from 'axios'
import speech from 'speech-js'
export var existe=false;
//lowest salary
export const salarioMenor = () => {
    
    let resultadoEmpleados;
    
    axios.get('http://localhost:3500/api/buscarmax/')
        .then(res => {
            
            resultadoEmpleados = (res.data.resultadoSalarios);
            let contador = 0;
            for (let i of resultadoEmpleados) {
                contador++;
                console.log(i.salario)

                if (contador === 1) {
                    console.log(i.salario)
                    speech.synthesis("El salario más bajo es " + i.salario + "euros que corresponde a " + i.nombre + i.apellidos) // speech synthesis module

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
//highest salary
export const salarioMayor = () => {
    
    let resultadoEmpleados;

    axios.get('http://localhost:3500/api/buscarmin/')
        .then(res => {

            resultadoEmpleados = (res.data.resultadoSalarios);
            let contador = 0;
            for (let i of resultadoEmpleados) {
                contador++;
                console.log(i.salario)

                if (contador === 1) {
                    console.log(i.salario)
                    speech.synthesis("El salario más alto es " + i.salario + "euros que corresponde a " + i.nombre + i.apellidos) // speech synthesis module

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
export const saludar = () => {
    
    speech.synthesis("Hola soy Noa tu asistente virtual de Recursos Humanos, ¿Qué necesitas?", 'es-ES') // speech synthesis module

    const recognition = speech.recognition('es-ES') // speech recognition module
    recognition.start()
    recognition.onresult = e => {
        let result = e.results[0][0].transcript
        speech.synthesis(result, 'es-ES')
    }
}
//The virtual agent says goodbye to the user
export const despedida = () => {
    
    speech.synthesis(`Adiós, ¡estoy para lo que necesites!`, 'es-ES') // speech synthesis module

    const recognition = speech.recognition('es-ES') // speech recognition module
    recognition.start()
    recognition.onresult = e => {
        let result = e.results[0][0].transcript
        speech.synthesis(result, 'es-ES')
    }
}

//error message
export const errorMessage = () => {
    
    speech.synthesis(`Vaya... Estoy teniendo problemas de soporte del navegador`, 'es-ES') // speech synthesis module

    const recognition = speech.recognition('es-ES') // speech recognition module
    recognition.start()
    recognition.onresult = e => {
        let result = e.results[0][0].transcript
        speech.synthesis(result, 'es-ES')
    }
}


//search employee
export const busqueda = (nombre, apellidos) => {
    let resultadoEmpleados;
    
    axios.get('http://localhost:3500/api/ver/' + nombre + '&' + apellidos)
        .then(res => {

            resultadoEmpleados = (res.data.resultado);
            console.log(resultadoEmpleados)
            for (let i of resultadoEmpleados) {

                speech.synthesis("Nombre del empleado " + i.nombre + ". Apellidos del empleado " + i.apellidos + ". Departamento " + i.departamento + ". Fecha de ingreso en la empresa: " + i.fecha_alta + ". Número de la seguridad social: " + i.seguridadsocial + ". Ofício " + i.oficio + ". Salario " + i.salario + "euros . Teléfono de contacto " + i.telefono)

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
export const eliminarEmpleado = (nombre, apellidos) => {
    let resultadoEliminacion;
    
    axios.delete('http://localhost:3500/api/delete/' + nombre + '&' + apellidos)
        .then(res => {

            resultadoEliminacion = (res.data.resultado);
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
export const ayuda = () => {
    
    speech.synthesis(`Puedes pedirme que busque datos de los trabajadores en la base de datos`)

    const recognition = speech.recognition('es-ES')
    recognition.start()
    recognition.onresult = e => {
        let result = e.results[0][0].transcript
        speech.synthesis(result, 'es-ES')
    }
}

export const buscarEmpleadoAntiguo = () => {
    
    let resultadoAntiguo;
    let contador = 0;
    axios.get('http://localhost:3500/api/buscarmaxFecha/')
        .then(res => {
            resultadoAntiguo = (res.data.resultadosFechas2)
            console.log(resultadoAntiguo)
            for (let i of resultadoAntiguo) {
                contador++;
                if (contador === 1) {
                    speech.synthesis(`El empleado más antiguo es ${i.nombre} ${i.apellidos} con fecha de alta en la empresa de ${i.fecha_alta}`)

                    const recognition = speech.recognition('es-ES')
                    recognition.start()
                    recognition.onresult = e => {
                        let result = e.results[0][0].transcript
                        speech.synthesis(result, 'es-ES')
                    }
                }
            }
        })
}

export const buscarEmpleadoReciente = () => {

    let contador = 0;
    let resultadoNuevo;
    axios.get('http://localhost:3500/api/buscarminFecha/')
        .then(res => {
            resultadoNuevo = (res.data.resultadosFechas)
            console.log(resultadoNuevo)
            for (let i of resultadoNuevo) {
                contador++;
                if (contador === 1) {
                    speech.synthesis(`La incorporación más nueva es el empleado ${i.nombre} ${i.apellidos} con fecha de alta en la empresa de ${i.fecha_alta}`)

                    const recognition = speech.recognition('es-ES')
                    recognition.start()
                    recognition.onresult = e => {
                        let result = e.results[0][0].transcript
                        speech.synthesis(result, 'es-ES')
                    }
                }
            }
        })
}

export const agregarUsuarios=(nombre, apellidos, oficio, departamento, fecha_alta, salario, seguridadsocial, telefono)=>{
    console.log("Hola mundo")
    let resultadoAgregar;
    axios.post('htttp://localhost:3500/api/save/')
    .then(res=>{
        resultadoAgregar=(res.data.datosEmpresa)
        console.log(resultadoAgregar)
        speech.synthesis(`La información del empleado ${nombre} ${apellidos} ha sido guardada en la base de datos`)

                    const recognition = speech.recognition('es-ES')
                    recognition.start()
                    recognition.onresult = e => {
                        let result = e.results[0][0].transcript
                        speech.synthesis(result, 'es-ES')
                    }
    })
}