import React, { useState } from 'react';
import NavBarAgain from '../components/NavBarAgain';
import ButtonAgain from '../components/ButtonAgain';
import { Form, Input, Toast } from 'antd-mobile';
import './Login.less';
import api from '../api';

const Login = (props) => {
  // 获取表单状态
  const [formIns] = Form.useForm();
  // 校验规则
  const validate = {
    phone(_, value) {
      value = value.trim();
      let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
      if (value.length === 0) return Promise.reject(new Error('手机号是必填项!'));
      if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误!'));
      return Promise.resolve();
    },
    code(_, value) {
      value = value.trim();
      let reg = /^\d{6}$/;
      if (value.length === 0) return Promise.reject(new Error('验证码是必填项!'));
      if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误!'));
      return Promise.resolve();
    },
  };

  /** state部分 **/
  let [disabled, setDisabled] = useState(false),
    [sendText, setSendText] = useState('发送验证码');

  /** effect部分 **/

  /** methods部分 **/
  const submit = async () => {
    try {
      await formIns.validateFields();
      let values = formIns.getFieldsValue();
      console.log(values);
    } catch (_) {}
  };

  const send = async () => {
    try {
      // 验证手机号
      await formIns.validateFields(['phone']);
    } catch (_) {}
  };

  /** styles部分 **/

  /** render **/
  return (
    <div className={'login-box'}>
      <NavBarAgain title="登录/注册"/>
      <Form
        layout="horizontal" style={{ '--border-top': 'none' }} form={formIns}
        initialValues={{ 'phone': '', 'code': '' }}
        footer={<ButtonAgain color="primary" onClick={submit}>提交</ButtonAgain>}
      >

        <Form.Item name="phone" label="手机号" rules={[{ validator: validate.phone }]}>
          <Input placeholder="请输入手机号"/>
        </Form.Item>

        <Form.Item
          name="code" label="验证码"
          rules={[{ validator: validate.code }]}
          extra={
            <ButtonAgain size="small" color="primary" disabled={disabled} onClick={send}>
              {sendText}
            </ButtonAgain>
          }>
          <Input/>
        </Form.Item>

      </Form>
    </div>
  );
};

export default Login;