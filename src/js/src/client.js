import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

export const getAllCustomerDeal = () =>
    fetch('api/CustomerDeal').then(checkStatus);

export const addNewCustomerDeal = CustomerDeal =>
    fetch('api/CustomerDeal', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(CustomerDeal)
    })
    .then(checkStatus);

export const updateCustomerDeal = (customerDealId, customerDeal) =>
    fetch(`api/CustomerDeal/${customerDealId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(customerDeal)
    })
    .then(checkStatus);

export const deleteCustomerDeal = customerDealId =>
    fetch(`api/CustomerDeal/${customerDealId}`, {
        method: 'DELETE'
    })
    .then(checkStatus);

