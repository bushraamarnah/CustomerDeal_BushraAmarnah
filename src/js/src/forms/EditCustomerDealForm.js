import React,  {Component} from 'react';
import { Formik } from 'formik';
import { Input, Tag, Button } from 'antd';

export default class EditCustomerDealForm extends Component {
    render () {
        const { submitter, initialValues } = this.props;
        return (
            <Formik
                initialValues={initialValues}
                validate={values => {
                    let errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.FromCurrency) {
                        errors.FromCurrency = 'From Currency required';
                    }
                    if (!values.ToCurrency) {
                        errors.ToCurrency = 'To Currency required';
                    }
                    if (!values.Dealtimestamp) {
                        errors.Dealtimestamp = 'Deal time stamp required';
                    }
                    if (!values.DealAmount) {
                        errors.DealAmount = 'Deal Amount required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    submitter(values);
                    setSubmitting(false);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      isValid,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      submitForm
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={{marginBottom: '5px'}}
                            name="FromCurrency"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.FromCurrency}
                        />
                        {errors.FromCurrency && touched.FromCurrency && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.FromCurrency}</Tag>}

                        <Input
                            style={{marginBottom: '5px'}}
                            name="ToCurrency"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ToCurrency}
                        />
                        {errors.ToCurrency && touched.ToCurrency && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.ToCurrency}</Tag>}

                        <Input
                            style={{marginBottom: '5px'}}
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.email}</Tag>}
                        <Input
                            style={{marginBottom: '5px'}}
                            name="Dealtimestamp"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Dealtimestamp}
                        />
                        {errors.Dealtimestamp && touched.Dealtimestamp && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.Dealtimestamp}</Tag>}
                        <Input
                            style={{marginBottom: '5px'}}
                            name="DealAmount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.DealAmount}
                        />
                        {errors.DealAmount && touched.DealAmount && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.DealAmount}</Tag>}

                        <Button onClick = {() => submitForm()} type="submit" disabled={isSubmitting | (touched && !isValid) }>
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        )
    }
}