import React from 'react';
import './style.scss';
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";

const Registration = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="sing sign-up">
      <div className="sing-wrapper">
        <h2>Registration</h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              { type: 'email',
                message: 'Please enter valid email!'
              }
            ]}
          >
            <Input />
          </Form.Item>



          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Minimum password length 8 characters!',
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  if (value.length < 8) {
                    return Promise.reject(new Error('Minimum password length 8 characters!'));
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p className="sing-question">Have account? <Link to="/login">Sign In to your account</Link></p>
        </Form>
      </div>
    </div>
  );
};

export default Registration;