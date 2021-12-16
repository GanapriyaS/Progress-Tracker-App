package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.AlienRepo1;
import com.example.demo.model.Task;

@RestController
public class alienController {
	
	
	@Autowired
	AlienRepo1 repo1;
	
	@RequestMapping("/")
	public String home() {
		return "home.jsp";
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/tasks",produces={"application/json"})
	@ResponseBody
	public List<Task> getAllTasks() {
		return repo1.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping(path="/task/{id}",produces={"application/json"})
	@ResponseBody
	public Optional<Task> getTask(@PathVariable int id) {
		return repo1.findById(id);
	}
		
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path="/tasks")
	public Task addTask(@RequestBody Task task) {
		
		repo1.save(task);
		return task;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path="/task/{id}",consumes= {"application/json"})
	public Task saveOrUpdateTask(@PathVariable(value = "id") int id,@RequestBody Task task) {
        Task existing_task = repo1.findById(id).orElse(null);
        
        existing_task.setTaskName(task.getTaskName());
        existing_task.setProgress(task.getProgress());
        existing_task.setDeadLine(task.getDeadLine());
        existing_task.setStatus(task.getStatus());
        return repo1.save(existing_task);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping(path="/task/progress/{id}",consumes= {"application/json"})
	public Task update(@PathVariable(value = "id") int id,@RequestBody Task task) {
        Task existing_task = repo1.findById(task.getId()).orElse(null);
        existing_task.setProgress(task.getProgress());
        return repo1.save(existing_task);
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/task/{id}")
	public String deleteAlien(@PathVariable int id) {
//		Task a = repo1.getOne(id);
//		repo1.delete(a);
		repo1.deleteById(id);
		return "deleted";
	}
	
	
}