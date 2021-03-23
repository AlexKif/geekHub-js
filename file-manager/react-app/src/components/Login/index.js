import React from 'react';
import './style.scss';
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";

const Login = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="sing sign-in">
      <div className="sing-wrapper">
        <h2>Sign in</h2>

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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              { min: 8,
                message: 'Minimum password length 8 characters'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p className="sing-question">Not registered? <Link to="/registration">Create an account</Link></p>
        </Form>
      </div>
    </div>
  );
};

export default Login;