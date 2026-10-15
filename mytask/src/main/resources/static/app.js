const inputBuscar = document.getElementById("inputBuscar")
const buscar = document.getElementById("buscar")
const listaTareas = document.getElementById("listaTareas")
const agregar = document.getElementById("agregar")
const eliminar = document.getElementById("eliminar")
const registrarTarea = document.getElementById("registrarTarea")
const cancelarTarea = document.getElementById("cancelarTarea")
const guardarTarea = document.getElementById("guardarTarea")

let modoEliminar = false
let tareasGuardadas = []

function cargarTareas() {
    fetch("/api/tareas")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se cargaron las tareas")
            }
            return response.json()
        })
        .then(tareas => {
            tareasGuardadas = tareas
            mostrarTareas(tareasGuardadas)
        })
        .catch(error => {
            console.error("Error:", error)
        })
}

function mostrarTareas(tareas) {
    listaTareas.innerHTML = ""
    tareas.forEach(tarea => {
        listaTareas.innerHTML += `
            <tr>
                <td>${tarea.id}</td>
                <td class="nombre">${tarea.nombre}</td>
                <td>
                    <span class="estado ${tarea.terminada ? "completada" : "pendiente"}">
                        ${tarea.terminada ? "Completada" : "Pendiente"}
                    </span>
                </td>
                <td class="celdaEliminar">
                    <button
                        type="button"
                        class="btnEliminar"
                        data-id="${tarea.id}"
                        title="Eliminar tarea"
                        aria-label="Eliminar tarea ${tarea.id}"
                        style="display: ${modoEliminar ? "inline-flex" : "none"}">🗑️
                    </button>
                </td>
            </tr>
        `
    })
}
cargarTareas()

// Mostrar el formulario para agregar una tarea
agregar.addEventListener("click", () => {
    registrarTarea.style.display = "flex"
})

// Registrar una tarea
guardarTarea.addEventListener("click", () => {
    const nombreTarea = document.getElementById("nombreTarea").value.trim()
    const terminada = document.getElementById("terminada").checked
    if (nombreTarea === "") {
        alert("Escribe el nombre de la tarea")
        return
    }
    const tarea = {
        id: undefined,
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
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al registrar tarea")
        }
        return response.json()
    })
    .then(resultado => {
        registrarTarea.style.display = "none"
        document.getElementById("nombreTarea").value = ""
        document.getElementById("terminada").checked = false
        cargarTareas()
    })
    .catch(error => {
        console.error("Error:", error)
    })
})

// Cancelar el registro
cancelarTarea.addEventListener("click", () => {
    registrarTarea.style.display = "none"
})

// Activar y desactivar el modo eliminar
eliminar.addEventListener("click", () => {
    modoEliminar = !modoEliminar
    mostrarTareas(tareasGuardadas)
    eliminar.classList.toggle("modoActivo", modoEliminar)
})

// Eliminar la tarea seleccionada
listaTareas.addEventListener("click", event => {
    const boton = event.target.closest(".btnEliminar")
    if (!boton || !modoEliminar) {
        return
    }
    event.stopPropagation()
    const id = boton.dataset.id
    const confirmar = confirm("¿Seguro que quieres eliminar esta tarea?")
    if (!confirmar) {
        return
    }
    fetch(`/api/tareas/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al eliminar tarea")
        }
        return response.status === 204 ? null : response.json()
    })
    .then(resultado => {
        cargarTareas()
    })
    .catch(error => {
        console.error("Error:", error)
        alert("No se pudo eliminar la tarea")
    })
})

// Buscar tareas por ID
buscar.addEventListener("click", () => {
    const nombreBuscado = inputBuscar.value.trim()
    if (nombreBuscado === "") {
        mostrarTareas(tareasGuardadas)
        return
    }
    let encontrado = false
    tareasGuardadas.forEach(tarea =>{
        if(tarea.nombre == nombreBuscado){
            encontrado = true
        }
    })
    if(encontrado){
        const resultado = tareasGuardadas.filter(tarea =>
            String(tarea.nombre) === nombreBuscado)
        mostrarTareas(resultado)
    }
    else{
        listaTareas.innerHTML = `
        <tr>
            <spam> No se encontraron tareas con el nombre ingresado </spam>
        </tr>`
        
    }
})

// Ocultar las canecas al hacer clic fuera de los controles
document.addEventListener("click", event => {
    if (!modoEliminar) {
        return
    }
    if (event.target.closest(".btnEliminar") || event.target.closest("#eliminar")) 
        {
        return
    }
    if (!event.target.closest(".tareas")) {
        modoEliminar = false
        mostrarTareas(tareasGuardadas)
        eliminar.classList.remove("modoActivo")
    }
})