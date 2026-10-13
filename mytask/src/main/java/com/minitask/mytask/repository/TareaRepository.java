package com.minitask.mytask.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.minitask.mytask.model.Tarea;

public interface  TareaRepository extends JpaRepository<Tarea,Long> {
}
