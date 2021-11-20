import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewCustomerDeal } from '../client';

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const AddCustomerDealForm = (props) => (
    <Formik
        initialValues={{ FromCurrency: '', ToCurrency: '', Dealtimestamp: '', email: '', DealAmount: ''}}
        validate={values => {
            let errors = {};

            if (!values.FromCurrency) {
                errors.FromCurrency = 'From Currency Required'
            }

            if (!values.ToCurrency) {
                errors.ToCurrency = 'To Currency Required'
            }

            if (!values.email) {
                errors.email = 'Email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit={(customerDeal, { setSubmitting }) => {
            addNewCustomerDeal(customerDeal).then(() => {
                props.onSuccess();
            })
            .catch(err => {
                props.onFailure(err);
            })
            .finally(() => {
                setSubmitting(false);
            })
        }}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
    }) => (
        <form onSubmit={handleSubmit}>
            <Input
                style={inputBottomMargin}
                name="FromCurrency"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.FromCurrency}
                placeholder='From Currency'
            />
            {errors.FromCurrency && touched.FromCurrency &&
                    <Tag style={tagStyle}>{errors.FromCurrency}</Tag>}
            <Input
                style={inputBottomMargin}
                name="ToCurrency"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ToCurrency}
                placeholder='To Currency'
            />
            {errors.ToCurrency && touched.ToCurrency &&
                <Tag style={tagStyle}>{errors.ToCurrency}</Tag>}
            <Input
                style={inputBottomMargin}
                name="Email"
                type='Email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='Email. E.g example@gmail.com'
            />
            {errors.email && touched.email && 
                <Tag style={tagStyle}>{errors.email}</Tag>}
            <Input
                style={inputBottomMargin}
                name="Dealtimestamp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Dealtimestamp}
                placeholder='Deal time stamp'
            />
            {errors.Dealtimestamp && touched.Dealtimestamp &&
                <Tag style={tagStyle}>{errors.Dealtimestamp}</Tag>}
            <Input
                style={inputBottomMargin}
                name="DealAmount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.DealAmount}
                placeholder='Deal Amount'
            />
            {errors.DealAmount && touched.DealAmount &&
            <Tag style={tagStyle}>{errors.DealAmount}</Tag>}
            <Button 
                onClick={() => submitForm()} 
                type="submit" 
                disabled={isSubmitting | (touched && !isValid)}>
                Submit
            </Button>
        </form>
    )}
    </Formik>
);


export default AddCustomerDealForm;