package com.barbershop.controller;

import com.barbershop.model.ServiceType;
import com.barbershop.model.ShopService;
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
@RequestMapping("/services")
public class ShopServiceController {

    private final ShopServiceService shopServiceService;

    public ShopServiceController(ShopServiceService shopServiceService) {
        this.shopServiceService = shopServiceService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("services", shopServiceService.findAll());
        model.addAttribute("shopService", new ShopService());
        model.addAttribute("types", ServiceType.values());
        return "services";
    }

    @PostMapping
    public String save(@Valid @ModelAttribute("shopService") ShopService shopService,
                       BindingResult bindingResult,
                       Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("services", shopServiceService.findAll());
            model.addAttribute("types", ServiceType.values());
            return "services";
        }
        shopServiceService.save(shopService);
        return "redirect:/services";
    }
}
