import React, { Component, Fragment } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import {
    getAllCustomerDeal,
    updateCustomerDeal,
    deleteCustomerDeal
} from './client';
import { AddCustomerDealForm } from './forms/AddCustomerDealForm';
import { EditCustomerDealForm } from './forms/EditCustomerDealForm';
import { errorNotification } from './Notification';

import {
    Table,
    Avatar,
    Spin,
    Modal,
    Empty,
    PageHeader,
    Button,
    notification,
    Popconfirm
} from 'antd';

class App extends Component {

    state = {
        customerDeal: [],
        isFetching: false,
        selectedCustomerDeal: {},
        isAddCustomerDealModalVisisble: false,
        isEditCustomerDealModalVisible: false,
    }

    componentDidMount () {
        this.fetchCustomerDeal();
    }

    openAddCustomerDealModal = () => this.setState({isAddCustomerDealModalVisisble: true})

    closeAddCustomerDealModal = () => this.setState({isAddCustomerDealModalVisisble: false})

    openEditCustomerDealModal = () => this.setState({ isEditCustomerDealModalVisible: true })

    closeEditCustomerDealModal = () => this.setState({ isEditCustomerDealModalVisible: false })

    openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

    fetchCustomerDeal = () => {
        this.setState({
            isFetching: true
        });
        getAllCustomerDeal()
            .then(res => res.json()
                .then(customerDeal => {
                    console.log(customerDeal);
                    this.setState({
                        customerDeal,
                        isFetching: false
                    });
                }))
            .catch(error => {
                console.log(error.error);
                const message = error.error.message;
                const description = error.error.error;
                errorNotification(message, description);
                this.setState({
                    isFetching: false
                });
            });
    }

    editUser = selectedCustomerDeal => {
        this.setState({ selectedCustomerDeal });
        this.openEditCustomerDealModal();
    }

    updateCustomerDealFormSubmitter = customerDeal => {
        updateCustomerDeal(customerDeal.CustomerDealID, customerDeal).then(() => {
            this.openNotificationWithIcon('success', 'Customer Deal updated', `${customerDeal.CustomerDealID} was updated`);
            this.closeEditCustomerDealModal();
            this.fetchCustomerDeal();
        }).catch(err => {
            console.error(err.error);
            this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
        });
    }

    deleteCustomerDeal = CustomerDealID => {
        deleteCustomerDeal(CustomerDealID).then(() => {
            this.openNotificationWithIcon('success', 'Customer Deal deleted', `${CustomerDealID} was deleted`);
            this.fetchCustomerDeal();
        }).catch(err => {
            this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
        });
    }

    render() {

        const { CustomerDeal, isFetching, isAddCustomerDealModalVisisble } = this.state;

        const commonElements = () => (
            <div>
                <Modal
                    title='Add new student'
                    visible={isAddCustomerDealModalVisisble}
                    onOk={this.closeAddCustomerDealModal()}
                    onCancel={this.closeAddCustomerDealModal()}
                    width={1000}>
                    <AddCustomerDealForm
                        onSuccess={() => {
                            this.closeAddCustomerDealModal();
                            this.fetchCustomerDeal();
                        }}
                        onFailure={(error) => {
                            const message = error.error.message;
                            const description = error.error.status;
                            errorNotification(message, description);
                        }}
                    />
                </Modal>

                <Modal
                    title='Edit'
                    visible={this.state.isEditCustomerDealModalVisible}
                    onOk={this.closeEditCustomerDealModal}
                    onCancel={this.closeEditCustomerDealModal}
                    width={1000}>

                    <PageHeader title={`${this.state.selectedCustomerDeal.customerDeal}`}/>

                    <EditCustomerDealForm
                        initialValues={this.state.selectedCustomerDeal}
                        submitter={this.updateCustomerDealFormSubmitter()}/>
                </Modal>

                <Footer
                    numberOfCustomerDeal={CustomerDeal.length}
                    handleAddCustomerDealClickEvent={this.openAddCustomerDealModal()}
                />
            </div>
        )

        if (CustomerDeal && CustomerDeal.length) {
            const columns = [
                {
                    title: '',
                    key: 'avatar',
                    render: (text, customerDeal) => (
                        <Avatar size='large'>
                            {`${customerDeal.FromCurrency.charAt(0).toUpperCase()}${customerDeal.ToCurrency.charAt(0).toUpperCase()}`}
                        </Avatar>
                    )
                },
                {
                    title: 'Customer Deal Id',
                    dataIndex: 'CustomerDealID',
                    key: 'CustomerDealID'
                },
                {
                    title: 'From Currency',
                    dataIndex: 'FromCurrency',
                    key: 'FromCurrency'
                },
                {
                    title: 'To Currency',
                    dataIndex: 'ToCurrency',
                    key: 'ToCurrency'
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: 'Deal time stamp',
                    dataIndex: 'Dealtimestamp',
                    key: 'Dealtimestamp'
                },
                {
                    title: 'Deal Amount',
                    dataIndex: 'DealAmount',
                    key: 'DealAmount'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Fragment>
                            <Popconfirm
                                placement='topRight'
                                title={`Are you sure to delete ${record.CustomerDealID}`}
                                onConfirm={() => this.deleteCustomerDeal(record.CustomerDealID)} okText='Yes' cancelText='No'
                                onCancel={e => e.stopPropagation()}>
                                <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
                            </Popconfirm>
                            <Button style={{marginLeft: '5px'}} type='primary' onClick={() => this.editUser(record)}>Edit</Button>
                        </Fragment>
                    ),
                }
            ];

            return (
                <Container>
                    <Table
                        style={{marginBottom: '100px'}}
                        dataSource={CustomerDeal}
                        columns={columns}
                        pagination={false}
                        rowKey='CustomerDealID'/>
                    {commonElements()}
                </Container>
            );

        }

        return (
            <Container>
                <Empty description={
                    <h1>No Customer Deal found</h1>
                }/>
                {commonElements()}
            </Container>
        )
    }
}

export default App;
