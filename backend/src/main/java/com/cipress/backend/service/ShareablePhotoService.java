package com.cipress.backend.service;

import com.cipress.backend.entity.ShareablePhoto;
import com.cipress.backend.repository.ShareablePhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShareablePhotoService {
    @Autowired
    private ShareablePhotoRepository repository;

    public List<ShareablePhoto> getAll() {
        return repository.findAll();
    }

    public ShareablePhoto save(ShareablePhoto photo) {
        return repository.save(photo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
