const inputBuscar = document.getElementById("inputBuscar")
const buscar = document.getElementById("buscar")
const listaTareas = document.getElementById("tareas")
const agregar = document.getElementById("agregar")
const eliminar = document.getElementById("eliminar")
const registrarTarea = document.getElementById("registrarTarea")



function cargarTareas(){
    fetch("/api/tareas")
    .then(response =>{
        if(!response.ok) throw new Error("No se cargaron las tareas")
        return response.json()
    })
    .then(tareas =>{
        listaTareas.innerHTML = ""
        tareas.forEach(tarea => {
            listaTareas.innerHTML += `
            <ul>
                <li>${tarea.id}</li>
                <li>${tarea.nombre}</li>
                <li>${tarea.terminada ? "completada" : "pendiente"}</li>
            </ul>
            `
        });
    })
    .catch(error=>{
        console.error("Error " , error)
    })
}
cargarTareas()

agregar.addEventListener("click", () =>{
    registrarTarea.style.display = "flex";
})

registrarTarea.addEventListener("click", () =>{
    const nombreTarea = document.getElementById("nombreTarea").value
    const terminada = document.getElementById("terminada").checked

    const tarea = {
        nombre: nombreTarea,
        terminada: terminada
    }
    fetch("/api/tareas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarea)
    })
    .then(response =>{
    if(!response.ok) throw new Error("Error en registrar tarea")
        return response.json();
    })
    .then(resultado =>{
        registrarTarea.style.display = "none"
        cargarTareas()
    })
    .catch(error =>{
        console.error("error ", error)
    })
})

