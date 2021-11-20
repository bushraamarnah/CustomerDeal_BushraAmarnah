package com.amigoscode.demo.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/students")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<CustomerDeal> getAllCustomerService() {
        return customerService.getAllCustomerDeal();
    }

    @PostMapping
    public void addNewCustomerDeal(@RequestBody @Valid CustomerDeal customerDeal) {
        customerService.addNewCustomerDeal(customerDeal);
    }

    @PutMapping(path = "{CustomerDealID}")
    public void updateStudent(@PathVariable("CustomerDealID") UUID CustomerDealID,
                              @RequestBody CustomerDeal customerDeal) {
        customerService.updateCustomer(CustomerDealID, customerDeal);
    }

    @DeleteMapping("{CustomerDealID}")
    public void deleteCustomerDealById(@PathVariable("CustomerDealID") UUID customerDealID) {
        customerService.deleteCustomerDealById(customerDealID);
    }

}
