package com.amigoscode.demo.customer;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.UUID;

public class CustomerDeal {

    @NotNull
    private UUID customerDealID ;

    @NotBlank @NotNull
    private String fromCurrency;

    @NotBlank @NotNull
    private String toCurrency;

    @NotBlank @NotNull
    private ZonedDateTime dealtimestamp;

    @NotBlank @NotNull
    private double dealAmount;

    @NotBlank
    private String email;

    public CustomerDeal(){}

    public CustomerDeal(UUID customerDealID, String fromCurrency, String toCurrency, String dealtimestamp, String dealAmount, String email) {
        this.customerDealID = customerDealID;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.dealtimestamp = ZonedDateTime.parse(dealtimestamp);
        this.dealAmount = Double.parseDouble(dealAmount);
        this.email = email;
    }

    public UUID getCustomerDealID() {
        return customerDealID;
    }

    public void setCustomerDealID(UUID customerDealID) {
        this.customerDealID = customerDealID;
    }

    public String getFromCurrency() {
        return fromCurrency;
    }

    public void setFromCurrency(String fromCurrency) {
        this.fromCurrency = fromCurrency;
    }

    public String getToCurrency() {
        return toCurrency;
    }

    public void setToCurrency(String toCurrency) {
        this.toCurrency = toCurrency;
    }

    public ZonedDateTime getDealtimestamp() {
        return dealtimestamp;
    }

    public void setDealtimestamp(ZonedDateTime dealtimestamp) {
        this.dealtimestamp = dealtimestamp;
    }

    public double getDealAmount() {
        return dealAmount;
    }

    public void setDealAmount(double dealAmount) {
        this.dealAmount = dealAmount;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "CustomerDeal{" +
                "customerDealID=" + customerDealID +
                ", fromCurrency='" + fromCurrency + '\'' +
                ", toCurrency='" + toCurrency + '\'' +
                ", dealtimestamp=" + dealtimestamp +
                ", dealAmount=" + dealAmount +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustomerDeal)) return false;
        CustomerDeal that = (CustomerDeal) o;
        return Double.compare(that.getDealAmount(), getDealAmount()) == 0 && Objects.equals(getCustomerDealID(), that.getCustomerDealID()) && Objects.equals(getFromCurrency(), that.getFromCurrency()) && Objects.equals(getToCurrency(), that.getToCurrency()) && Objects.equals(getDealtimestamp(), that.getDealtimestamp()) && Objects.equals(getEmail(), that.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCustomerDealID(), getFromCurrency(), getToCurrency(), getDealtimestamp(), getDealAmount(), getEmail());
    }
}

