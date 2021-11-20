package com.amigoscode.demo.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class CustomerDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CustomerDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<CustomerDeal> selectAllCustomerDeal() {
        String sql = "" +
                "SELECT " +
                " CustomerDealID, " +
                " FromCurrency, " +
                " ToCurrency, " +
                " Dealtimestamp, " +
                " DealAmount " +
                " Email, " +
                "FROM CustomerDeal";

        return jdbcTemplate.query(sql, mapCustomerDealFomDb());
    }

    int insertCustomerDeal(UUID CustomerDealID, CustomerDeal customerDeal) {
        String sql = "" +
                "INSERT INTO CustomerDeal (" +
                  CustomerDealID +
                " FromCurrency, " +
                " ToCurrency, " +
                " Dealtimestamp, " +
                " DealAmount) " +
                " Email, " +
                "VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(
                sql,
                customerDeal.getCustomerDealID(),
                customerDeal.getFromCurrency(),
                customerDeal.getToCurrency(),
                customerDeal.getDealtimestamp(),
                customerDeal.getDealAmount(),
                customerDeal.getEmail()
                );
    }


    @SuppressWarnings("ConstantConditions")
    boolean isCustomerEmailTaken(String email) {
        String sql = "" +
                "SELECT EXISTS ( " +
                " SELECT 1 " +
                " FROM CustomerDeal " +
                " WHERE Email = ?" +
                ")";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{email},
                (resultSet, i) -> resultSet.getBoolean(1)
        );
    }

    private RowMapper<CustomerDeal> mapCustomerDealFomDb() {
        return (resultSet, i) -> {
            String customerDealIdStr = resultSet.getString("CustomerDealID");
            UUID CustomerDealID = UUID.fromString(customerDealIdStr);
            String FromCurrency = resultSet.getString("FromCurrency");
            String ToCurrency = resultSet.getString("ToCurrency");
            String DealTimeStamp = resultSet.getString("Dealtimestamp");
            String DealAmount = resultSet.getString("DealAmount");
            String Email = resultSet.getString("Email");

            return new CustomerDeal(
                    CustomerDealID,
                    FromCurrency,
                    ToCurrency,
                    DealTimeStamp,
                    DealAmount,
                    Email
            );
        };
    }

    int updateFromCurrency(UUID CustomerDealID, String FromCurrency) {
        String sql = "" +
                "UPDATE CustomerDeal " +
                "SET FromCurrency = ? " +
                "WHERE CustomerDealID = ?";
        return jdbcTemplate.update(sql, FromCurrency, CustomerDealID);
    }

    int updateCustomerEmail(UUID CustomerDealID, String email) {
        String sql = "" +
                "UPDATE CustomerDeal " +
                "SET Email = ? " +
                "WHERE CustomerDealID = ?";
        return jdbcTemplate.update(sql, email, CustomerDealID);
    }

    int updateToCurrency(UUID CustomerDealID, String ToCurrency) {
        String sql = "" +
                "UPDATE CustomerDeal " +
                "SET ToCurrency = ? " +
                "WHERE CustomerDealID = ?";
        return jdbcTemplate.update(sql, ToCurrency, CustomerDealID);
    }

    @SuppressWarnings("ConstantConditions")
    boolean selectCustomerExistsEmail(UUID customerDealID, String email) {
        String sql = "" +
                "SELECT EXISTS ( " +
                "   SELECT 1 " +
                "   FROM CustomerDeal " +
                "   WHERE CustomerDealID <> ? " +
                "    AND Email = ? " +
                ")";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{customerDealID, email},
                (resultSet, columnIndex) -> resultSet.getBoolean(1)
        );
    }

    int deleteCustomerDealById(UUID CustomerDealID) {
        String sql = "" +
                "DELETE FROM CustomerDeal " +
                "WHERE CustomerDealID = ?";
        return jdbcTemplate.update(sql, CustomerDealID);
    }
}
