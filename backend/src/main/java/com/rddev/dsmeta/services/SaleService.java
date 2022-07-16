package com.rddev.dsmeta.services;

import com.rddev.dsmeta.entities.Sale;
import com.rddev.dsmeta.repositories.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository repository;

    public List<Sale> findSales() {
        return repository.findAll();
    }
}
