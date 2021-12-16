package com.example.demo.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Task {
	
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		private String taskName;
		private int progress;
		
		private String status;
		private String deadLine;
		public String getDeadLine() {
			return deadLine;
		}
		public void setDeadLine(String deadLine) {
			this.deadLine = deadLine;
		}
		private Date createdAt;
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getTaskName() {
			return taskName;
		}
		public void setTaskName(String taskName) {
			this.taskName = taskName;
		}
		public int getProgress() {
			return progress;
		}
		public void setProgress(int progress) {
			this.progress = progress;
		}
		public String getStatus() {
			return status;
		}
		@Override
		public String toString() {
			return "Task [id=" + id + ", taskName=" + taskName + ", progress=" + progress + ", status=" + status
					+ ", deadLine=" + deadLine + ", createdAt=" + createdAt + "]";
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public Date getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}
		

}