package com.amigoscode.demo.customer;

import com.amigoscode.demo.EmailValidator;
import com.amigoscode.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerDataAccessService customerDataAccessService;
    private final EmailValidator emailValidator;

    @Autowired
    public CustomerService(CustomerDataAccessService customerDataAccessService,
                           EmailValidator emailValidator) {
        this.customerDataAccessService = customerDataAccessService;
        this.emailValidator = emailValidator;
    }

    List<CustomerDeal> getAllCustomerDeal() {
        return customerDataAccessService.selectAllCustomerDeal();
    }

    void addNewCustomerDeal(CustomerDeal customerDeal) {
        addNewCustomerDeal(null, customerDeal);
    }

    void addNewCustomerDeal(UUID customerDealID, CustomerDeal customerDeal) {
        UUID newCustomerDealID = Optional.ofNullable(customerDealID)
                .orElse(UUID.randomUUID());

        if (!emailValidator.test(customerDeal.getEmail())) {
            throw new ApiRequestException(customerDeal.getEmail() + " is not valid");
        }

        if (customerDataAccessService.isCustomerEmailTaken(customerDeal.getEmail())) {
            throw new ApiRequestException(customerDeal.getEmail() + " is taken");
        }

        customerDataAccessService.insertCustomerDeal(newCustomerDealID, customerDeal);
    }

    List<CustomerDeal> getAllDealCustomer() {
        return customerDataAccessService.selectAllCustomerDeal();
    }

    public void updateCustomer(UUID customerDealId, CustomerDeal customerDeal) {
        Optional.ofNullable(customerDeal.getEmail())
                .ifPresent(email -> {
                    boolean taken = customerDataAccessService.selectCustomerExistsEmail(customerDealId, email);
                    if (!taken) {
                        customerDataAccessService.updateCustomerEmail(customerDealId, email);
                    } else {
                        throw new IllegalStateException("Email already in use: " + customerDeal.getEmail());
                    }
                });

        Optional.ofNullable(customerDeal.getFromCurrency())
                .filter(FromCurrency -> !StringUtils.isEmpty(FromCurrency))
                .map(StringUtils::capitalize)
                .ifPresent(FromCurrency -> customerDataAccessService.updateFromCurrency(customerDealId, FromCurrency));

        Optional.ofNullable(customerDeal.getToCurrency())
                .filter(ToCurrency -> !StringUtils.isEmpty(ToCurrency))
                .map(StringUtils::capitalize)
                .ifPresent(ToCurrency -> customerDataAccessService.updateToCurrency(customerDealId, ToCurrency));
    }

    void deleteCustomerDealById(UUID customerDealId) {
        customerDataAccessService.deleteCustomerDealById(customerDealId);
    }
}
