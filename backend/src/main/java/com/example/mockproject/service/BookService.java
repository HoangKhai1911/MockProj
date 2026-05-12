package com.example.mockproject.service;

import com.example.mockproject.model.Book;
import com.example.mockproject.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> getAll() {
        return repository.findAll();
    }

    public Optional<Book> getById(Long id) {
        return repository.findById(id);
    }

    public List<Book> searchByTitle(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }

    public Book create(Book book) {
        book.setId(null);
        return repository.save(book);
    }

    public Optional<Book> update(Long id, Book book) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(book.getTitle());
            existing.setAuthor(book.getAuthor());
            existing.setCategory(book.getCategory());
            existing.setAvailable(book.getAvailable());
            return repository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
