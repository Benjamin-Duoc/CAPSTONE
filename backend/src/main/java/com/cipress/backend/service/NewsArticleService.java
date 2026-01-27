package com.cipress.backend.service;

import com.cipress.backend.entity.NewsArticle;
import com.cipress.backend.repository.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NewsArticleService {
    @Autowired
    private NewsArticleRepository repository;

    public List<NewsArticle> getAll() {
        return repository.findAll();
    }

    public NewsArticle save(NewsArticle article) {
        return repository.save(article);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
