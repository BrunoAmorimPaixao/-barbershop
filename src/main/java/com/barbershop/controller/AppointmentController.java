package com.barbershop.controller;

import com.barbershop.controller.form.AppointmentForm;
import com.barbershop.service.AppointmentService;
import com.barbershop.service.BarberService;
import com.barbershop.service.ClientService;
import com.barbershop.service.ShopServiceService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final ClientService clientService;
    private final BarberService barberService;
    private final ShopServiceService shopServiceService;

    public AppointmentController(AppointmentService appointmentService,
                                 ClientService clientService,
                                 BarberService barberService,
                                 ShopServiceService shopServiceService) {
        this.appointmentService = appointmentService;
        this.clientService = clientService;
        this.barberService = barberService;
        this.shopServiceService = shopServiceService;
    }

    @GetMapping
    public String list(Model model) {
        populateForm(model);
        model.addAttribute("appointments", appointmentService.findAll());
        model.addAttribute("appointmentForm", new AppointmentForm());
        return "appointments";
    }

    @PostMapping
    public String save(@Valid @ModelAttribute("appointmentForm") AppointmentForm appointmentForm,
                       BindingResult bindingResult,
                       Model model) {
        if (bindingResult.hasErrors()) {
            populateForm(model);
            model.addAttribute("appointments", appointmentService.findAll());
            return "appointments";
        }
        appointmentService.save(appointmentForm);
        return "redirect:/appointments";
    }

    private void populateForm(Model model) {
        model.addAttribute("clients", clientService.findAll());
        model.addAttribute("barbers", barberService.findAll());
        model.addAttribute("services", shopServiceService.findAll());
    }
}
