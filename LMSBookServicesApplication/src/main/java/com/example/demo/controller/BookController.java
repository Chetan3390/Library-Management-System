package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Book;
import com.example.demo.service.BookService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/books")
@AllArgsConstructor
public class BookController {

	private final BookService bookService;

	@GetMapping("/requested/{userId}")
    public ResponseEntity<List<Book>> getRequestedBooks(@PathVariable int userId) {
        List<Book> books = bookService.getRequestedBooks(userId);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/accepted/{userId}")
    public ResponseEntity<List<Book>> getAcceptedBooks(@PathVariable int userId) {
        List<Book> books = bookService.getAcceptedBooks(userId);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/requested")
    public ResponseEntity<List<Book>> getAllRequestedBooks() {
        List<Book> books = bookService.getRequestedBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/accepted")
    public ResponseEntity<List<Book>> getAllAcceptedBooks() {
        List<Book> books = bookService.getAcceptedBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PutMapping("/request/{bookId}/{userId}")
    public ResponseEntity<String> requestBook(@PathVariable Long bookId, @PathVariable int userId) {
        bookService.requestBook(bookId, userId);
        return ResponseEntity.ok("Book requested successfully");
    }

    @PutMapping("/return/{bookId}/{userId}")
    public ResponseEntity<String> returnBook(@PathVariable Long bookId, @PathVariable int userId) {
    	 return ResponseEntity.ok(bookService.returnBook(bookId, userId));
    }
}
