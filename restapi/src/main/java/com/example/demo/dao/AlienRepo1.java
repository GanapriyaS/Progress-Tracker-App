package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Task;

@Repository
public interface AlienRepo1 extends JpaRepository<Task,Integer> {
	
}

