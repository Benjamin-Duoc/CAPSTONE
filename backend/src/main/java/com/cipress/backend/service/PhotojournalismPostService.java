package com.cipress.backend.service;

import com.cipress.backend.entity.PhotojournalismPost;
import com.cipress.backend.repository.PhotojournalismPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PhotojournalismPostService {
    @Autowired
    private PhotojournalismPostRepository repository;

    public List<PhotojournalismPost> getAll() {
        return repository.findAll();
    }

    public PhotojournalismPost save(PhotojournalismPost post) {
        return repository.save(post);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
