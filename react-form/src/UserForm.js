import React, {PureComponent} from 'react';
import {Button, Input, Select} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";


export default class UserForm extends PureComponent {

    state = {
        name: this.props.user.name,
        email: this.props.user.email,
        password: this.props.user.password,
        phones: this.props.user.phones,
        validation: {
            name: null,
            email: null,
            password: null,
            phones: []
        }
    }

    inputHandler = (value, typeField) => {
        this.setState(prevState => ({...prevState, [typeField]: value}))
    }

    phoneHandler = (value, key, index) => {
        this.setState(state => {
            const changedPhones = state.phones
            if (key === "number") {
                changedPhones.splice(index, 1, {...state.phones[index], number: value})
            }
            if (key === "type") {
                changedPhones.splice(index, 1, {...state.phones[index], type: value})
            }
            return {
                ...state,
                phonesData: [...changedPhones]
            }
        })
    }

    handlerSubmit = (e) => {
        e.preventDefault();

        const {name, email, password, phones} = this.state;
        const allFields = [
            {field: 'name', value: name},
            {field: 'email', value: email},
            {field: 'password', value: password},
            {field: 'phones', value: phones}
        ]
        allFields.forEach(item => {
            if (item.field !== 'phones') {
                const {field, result} = this.validateFields(item);
                this.setState(state => {
                    return {
                        ...state,
                        validation: {
                            ...state.validation,
                            [field]: result
                        }
                    }
                })
            } else {
                const phonesValidation = [];
                item.value.forEach(({type, number}) => {
                    const formattedObject = {field: type, value: number}
                    const {result} = this.validateFields(formattedObject);
                    phonesValidation.push(result)
                })
                this.setState(state => {
                    return {
                        ...state,
                        validation: {
                            ...state.validation,
                            phones: [...phonesValidation]
                        }
                    }
                })
            }
        })
    }

    validateFields = ({field, value}) => {
        const nameRegEx = /^([А-Яа-яёЁЇїІіЄєҐґ]+\s+){2}[А-Яа-яёЁЇїІіЄєҐґ]+$/;
        const emailRegEx = /^([a-zA-Z0-9]|(?!\.)[a-zA-Z0-9-.]{1,}[a-zA-Z0-9-])@([a-zA-Z0-9-]+[.]+[a-zA-Z0-9-]+)+$/;
        const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
        const homeRegEx = /^[1-9]{6}$/;
        const mobileRegEx = /^(0[0-9]{9}|3[0-9]{11})$/;

        switch (field) {
            case 'name':
                return {field, result: nameRegEx.test(value)}
            case 'email':
                return {field, result: emailRegEx.test(value)}
            case 'password':
                return {field, result: passRegEx.test(value)}
            case 'home':
                return {field, result: homeRegEx.test(value)}
            case 'mobile':
                return {field, result: mobileRegEx.test(value)}
        }
    }

    addNumber = () => {
        this.setState(state => ({phones: [...state.phones, {number: '', type: 'home'}]}))
    }

    deleteNumber = (index) => {
        this.setState(state => {
            const tempPhones = state.phones
            const tempPhonesValidation = state.validation.phones
            tempPhones.splice(index, 1)
            tempPhonesValidation.splice(index, 1)
            return {
                ...state,
                phones: [...tempPhones],
                validation: {
                    ...state.validation,
                    phones: [...tempPhonesValidation]
                }
            }
        })
    }

    render() {
        const {name, email, password, validation} = this.state;
        return (
            <div className="wrapper">
                <div className="inputs-group">
                    <form onSubmit={this.handlerSubmit}>
                        <Input placeholder="Name"
                               value={name}
                               type="text"
                               style={validation.name === false ? {background: '#F9D0C4', borderColor: 'transparent'}:
                                   validation.name === true ? {background: '#C2E0C6', borderColor: 'transparent'}: null}
                               onChange={(e) => this.inputHandler(e.target.value, 'name')}
                        />
                        <Input placeholder="Email"
                               value={email}
                               type="text"
                               style={validation.email === false ? {background: '#F9D0C4', borderColor: 'transparent'}:
                                   validation.email === true ? {background: '#C2E0C6', borderColor: 'transparent'}: null}
                               onChange={(e) => this.inputHandler(e.target.value, 'email')}
                        />
                        <Input placeholder="Password"
                               value={password}
                               type="password"
                               style={validation.password === false ? {background: '#F9D0C4', borderColor: 'transparent'}:
                                   validation.password === true ? {background: '#C2E0C6', borderColor: 'transparent'}: null}
                               onChange={(e) => this.inputHandler(e.target.value, 'password')}
                        />
                        <div className="">
                            {this.state.phones.map((item, index) => {
                                return (
                                    <div key={index} className="phone-wrapper" style={{border: '1px solid blue', marginBottom: '20px', padding: '10px'}}>
                                        <div className="phone-input">
                                            <Input placeholder="Phone number"
                                                   type="phone"
                                                   value={item.number}
                                                   style={validation.phones[index] === false ? {background: '#F9D0C4', borderColor: 'transparent'}:
                                                       validation.phones[index] === true ? {background: '#C2E0C6', borderColor: 'transparent'}: null}
                                                   onChange={(e) => this.phoneHandler(e.target.value, 'number', index)}
                                            />
                                            <Select value={item.type} onChange={(value) => this.phoneHandler(value, 'type', index)}>
                                                <Select.Option value="home">Home</Select.Option>
                                                <Select.Option value="mobile">Mobile</Select.Option>
                                            </Select>
                                        </div>
                                        <Button danger onClick={() => this.deleteNumber(index)}>Delete</Button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="">
                            <Button onClick={this.addNumber}><PlusCircleOutlined />Add number</Button>
                        </div>
                       <div className="">
                           <Button htmlType="submit" type="primary">Submit</Button>
                       </div>
                    </form>
                </div>
            </div>
        )
    }
}


