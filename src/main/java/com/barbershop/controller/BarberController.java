package com.barbershop.controller;

import com.barbershop.model.Barber;
import com.barbershop.service.BarberService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/barbers")
public class BarberController {

    private final BarberService barberService;

    public BarberController(BarberService barberService) {
        this.barberService = barberService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("barbers", barberService.findAll());
        model.addAttribute("barber", new Barber());
        return "barbers";
    }

    @PostMapping
    public String save(@Valid @ModelAttribute("barber") Barber barber, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("barbers", barberService.findAll());
            return "barbers";
        }
        barberService.save(barber);
        return "redirect:/barbers";
    }
}
