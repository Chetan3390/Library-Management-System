package com.example.demo.entity;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String author;

	private boolean accepted;

	private boolean requested;
	
    private int userId; 
}
