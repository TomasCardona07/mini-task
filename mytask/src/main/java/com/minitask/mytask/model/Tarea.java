package com.minitask.mytask.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;  

@Entity
@Table(name ="tarea")
public class Tarea {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name ="id_tarea")
    private long id;
    
    @NotBlank (message = "El nombre no puede estar vacio")
    @Size (min = 1, max = 100, message = "el nombre debe tener entre 1-100 caracteres")
    @Column(name ="nombre_tarea")
    private String nombre;

    @Column(name ="tarea_terminada")
    private Boolean terminada;

    public Tarea(String nombre, Boolean terminada){
        this.nombre = nombre;
        this.terminada = terminada;
    }
    public Tarea(){

    }

    public String getNombre(){
        return this.nombre;
    }

    public Boolean getTerminada(){
        return this.terminada;
    }

    public void setNombre(String nuevoNombre){
        this.nombre = nuevoNombre;
    }
    public void setCompletado(Boolean completada){
        this.terminada = completada;
    }
}
