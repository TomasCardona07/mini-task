package com.minitask.mytask.service;
import  com.minitask.mytask.model.*;
import java.util.List;

import org.springframework.stereotype.Service;
import com.minitask.mytask.repository.TareaRepository;

@Service 
public class TareaService {

    private TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository){
        this.tareaRepository = tareaRepository;
    }


    public List<Tarea> cargarTareas(){
        return tareaRepository.findAll();
    }

    public Tarea agregarTarea(Tarea tarea){
        Tarea tareaJava = new Tarea(tarea.getNombre(),tarea.getTerminada());
        return tareaRepository.save(tareaJava);
    }

    public long eliminarTarea(long id){
        tareaRepository.deleteById(id);
        return id;
    }
}
