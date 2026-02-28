package com.barbershop.service;

import com.barbershop.controller.form.AppointmentForm;
import com.barbershop.model.Appointment;
import com.barbershop.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final GoogleCalendarService googleCalendarService;
    private final ClientService clientService;
    private final BarberService barberService;
    private final ShopServiceService shopServiceService;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              GoogleCalendarService googleCalendarService,
                              ClientService clientService,
                              BarberService barberService,
                              ShopServiceService shopServiceService) {
        this.appointmentRepository = appointmentRepository;
        this.googleCalendarService = googleCalendarService;
        this.clientService = clientService;
        this.barberService = barberService;
        this.shopServiceService = shopServiceService;
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    @Transactional
    public Appointment save(Appointment appointment) {
        String eventId = googleCalendarService.createEvent(appointment);
        appointment.setGoogleCalendarEventId(eventId);
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment save(AppointmentForm form) {
        Appointment appointment = new Appointment();
        appointment.setClient(clientService.findOrCreateByName(form.getClientName()));
        appointment.setBarber(barberService.findById(form.getBarberId()));
        appointment.setService(shopServiceService.findById(form.getServiceId()));
        appointment.setAppointmentDateTime(form.getAppointmentDateTime());
        appointment.setNotes(form.getNotes());
        return save(appointment);
    }
}
