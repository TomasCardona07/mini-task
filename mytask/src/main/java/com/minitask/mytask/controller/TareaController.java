package com.minitask.mytask.controller;

import com.minitask.mytask.model.*;
import com.minitask.mytask.service.*;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

@Controller 
@RestController 
@RequestMapping("/api/tareas")
public class TareaController {

    private TareaService tareaService;

    public TareaController(TareaService tareaService){
        this.tareaService = tareaService;
    }


    @GetMapping
    public List<Tarea> cargarTareas() { 
        return tareaService.cargarTareas();
    }

    @PostMapping
    public ResponseEntity<?> agregarTarea(@RequestBody Tarea tarea) {
        try {
            return ResponseEntity.ok(tareaService.agregarTarea(tarea));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error en guardar tareas desde java " + e.getMessage());
        }
    }
    
}
