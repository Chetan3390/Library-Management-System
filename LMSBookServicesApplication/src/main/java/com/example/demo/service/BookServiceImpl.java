package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.client.AdminFeignClient;
import com.example.demo.entity.Book;
import com.example.demo.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

	private final AdminFeignClient adminFeignClient;

	@Override
    public List<Book> getAllBooks() {
        return adminFeignClient.getAllBooks();
    }

    @Override
    public List<Book> getRequestedBooks(int userId) {
        return adminFeignClient.getAllBooks().stream()
            .filter(book -> book.isRequested() && book.getUserId() == userId)
            .toList();
    }

    @Override
    public List<Book> getAcceptedBooks(int userId) {
        return adminFeignClient.getAllBooks().stream()
            .filter(book -> book.isAccepted() && book.getUserId() == userId)
            .toList();
    }

    @Override
    public List<Book> getRequestedBooks() {
        return adminFeignClient.getRequestedBooks();
    }

    @Override
    public List<Book> getAcceptedBooks() {
        return adminFeignClient.getAcceptedBooks();
    }

    @Override
    public void requestBook(Long bookId, int userId) {
        Book book = adminFeignClient.getBookById(bookId);
        adminFeignClient.requestBook(bookId, userId);
    }

    @Override
    public String returnBook(Long bookId, int userId) {
        return adminFeignClient.returnBook(bookId, userId);
    }

    @Override
    public void acceptBookRequest(Long bookId, int userId) {
        adminFeignClient.acceptBookRequest(bookId, userId);
    }

    @Override
    public void rejectBookRequest(Long bookId, int userId) {
        adminFeignClient.rejectBookRequest(bookId, userId);
    }

    @Override
    public void revokeBook(Long bookId, int userId) {
        adminFeignClient.revokeBook(bookId, userId);
    }
}