import React, {useState} from 'react';
import {Button, Input, Select} from "antd";

const PhoneItem = ({number, type, phones, index, handlerChangePhone}) => {
    const [phone, setPhone] = useState({number, type})

    const phoneHandler = (value, key) => {
        setPhone(prevState => ({...prevState, [key]: value}))
        handlerChangePhone({number: value, type: key}, index)
    }

    return (
        <div className="phone-wrapper" style={{border: '1px solid blue', marginBottom: '20px', padding: '10px'}}>
            <div className="phone-input">
                <Input placeholder="Phone number"
                       type="phone"
                       value={phone.number}
                       onChange={(e) => phoneHandler(e.target.value, 'number')}
                />
                <Select value={phone.type} onChange={(value) => phoneHandler(value, 'type')}>
                    <Select.Option value="home">Home</Select.Option>
                    <Select.Option value="mobile">Mobile</Select.Option>
                </Select>
            </div>
            <Button danger>Delete</Button>
        </div>
    );
};

export default PhoneItem;