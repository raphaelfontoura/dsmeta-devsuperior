package com.rddev.dsmeta.controllers;

import com.rddev.dsmeta.entities.Sale;
import com.rddev.dsmeta.services.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController
{
    private final SaleService service;

    @GetMapping
    public Page<Sale> findSales(@RequestParam(value = "minDate", defaultValue = "") String minDate,
                                @RequestParam(value = "maxDate", defaultValue = "") String maxDate,
                                Pageable pageable) {
        return service.findSales(minDate, maxDate, pageable);
    }
}
