import React, {PureComponent} from 'react';
import {Button, Input, Select} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";


export default class UserForm extends PureComponent {

    state = {
        name: this.props.user.name,
        email: this.props.user.email,
        password: this.props.user.password,
        phones: this.props.user.phones,
        validation: {}
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
        const allFields = [

        ]
    }

    validateFields = (value, type) => {
        const nameRegEx = /^([А-Яа-яёЁЇїІіЄєҐґ]+\s+){2}[А-Яа-яёЁЇїІіЄєҐґ]+$/;
        const EmailRegEx = /^([a-zA-Z0-9]|(?!\.)[a-zA-Z0-9-.]{1,}[a-zA-Z0-9-])@([a-zA-Z0-9-]+[.]+[a-zA-Z0-9-]+)+$/;
        const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/

        switch (type) {
            case 'name':
                return
        }
    }

    addNumber = () => {
        this.setState(state => ({phones: [{number: '', type: 'home'}, ...state.phones]}))
    }

    deleteNumber = (index) => {
        this.setState(state => {
            const tempPhones = state.phones
            tempPhones.splice(index, 1)
            return {
                ...state,
                phones: [...tempPhones]
            }
        })
    }


    render() {
        console.log(this.state.phones)
        const {name, email, password} = this.state;
        return (
            <div className="wrapper">
                <div className="inputs-group">
                    <form onSubmit={this.handlerSubmit}>
                        <Input placeholder="Name"
                               value={name}
                               type="text"
                               onChange={(e) => this.inputHandler(e.target.value, 'name')}
                        />
                        <Input placeholder="Email"
                               value={email}
                               type="email"
                               onChange={(e) => this.inputHandler(e.target.value, 'email')}
                        />
                        <Input placeholder="Password"
                               value={password}
                               type="password"
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


