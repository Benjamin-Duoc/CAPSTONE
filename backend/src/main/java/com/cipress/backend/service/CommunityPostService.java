package com.cipress.backend.service;

import com.cipress.backend.entity.CommunityPost;
import com.cipress.backend.repository.CommunityPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommunityPostService {
    @Autowired
    private CommunityPostRepository repository;

    public List<CommunityPost> getAll() {
        return repository.findAll();
    }

    public CommunityPost save(CommunityPost post) {
        return repository.save(post);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
