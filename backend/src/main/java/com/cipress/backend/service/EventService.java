package com.cipress.backend.service;

import com.cipress.backend.entity.Event;
import com.cipress.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository repository;

    public List<Event> getAll() {
        return repository.findAll();
    }

    public Event save(Event event) {
        return repository.save(event);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
