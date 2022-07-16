package com.rddev.dsmeta.services;

import com.rddev.dsmeta.entities.Sale;
import com.rddev.dsmeta.repositories.SaleRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@Slf4j
@RequiredArgsConstructor
public class SmsService {

    private final SaleRepository saleRepository;
    @Value("${twilio.sid}")
    private String twilioSid;
    @Value("${twilio.key}")
    private String twilioKey;
    @Value("${twilio.phone.to}")
    private String twilioPhoneTo;
    @Value("${twilio.phone.from}")
    private String twilioPhoneFrom;

    public void sendSms(Long saleId) {

        Sale sale = saleRepository.findById(saleId).get();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/uuuu");
        String date = formatter.format(sale.getDate());

        String msg = String.format("O vendedor %s foi destaque em %s com um total de R$ %.2f",
                sale.getSellerName(),
                date,
                sale.getAmount());

        Twilio.init(twilioSid, twilioKey);

        PhoneNumber to = new PhoneNumber(twilioPhoneTo);
        PhoneNumber from = new PhoneNumber(twilioPhoneFrom);

        Message message = Message.creator(to, from, msg).create();

        log.info(" [TWILIO SMS] " + message.getSid() + " == " + msg);
    }
}
