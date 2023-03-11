import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavBarAgain from '../components/NavBarAgain';
import ButtonAgain from '../components/ButtonAgain';
import { Form, Input, Toast } from 'antd-mobile';
import './Login.less';
import api from '../api';
import _ from '../assets/utils';
import action from '../store/actions/index';

const Login = (props) => {
  let { queryUserInfoAsync, navigate, usp } = props;
  // 获取表单状态
  const [formIns] = Form.useForm();
  // 计时器
  let timer = null, num = 30;
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
  // 清除定时器
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }, []);

  /** methods部分 **/
  const submit = async () => {
    try {
      await formIns.validateFields();
      let { phone, code } = formIns.getFieldsValue();
      let { code: codeHttp, token } = await api.login(phone, code);
      if (+codeHttp !== 0) {
        Toast.show({
          icon: 'fail',
          content: '登录失败'
        });
        formIns.resetFields(['code']);
        return;
      }
      // 存储Token
      _.storage.set('tk', token);
      // 存储至Redux
      await queryUserInfoAsync(); // 派发任务，同步Redux中的状态信息
      Toast.show({
        icon: 'success',
        content: '登录/注册成功'
      });
      // 路由跳转
      let to = usp.get('to');
      to ? navigate(to, { replace: true }) : navigate(-1);
    } catch (_) {}
  };

  const send = async () => {
    try {
      // 验证手机号
      await formIns.validateFields(['phone']);
      let phone = formIns.getFieldValue('phone');
      let { code } = await api.sendPhoneCode(phone);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '发送失败'
        });
        return;
      }
      // 设置不可操作状态
      setDisabled(true);
      countdown();
      if (!timer) timer = setInterval(countdown, 1000);
    } catch (_) {}
  };

  // 倒计时函数
  const countdown = () => {
    num--;
    if (num === 0) {
      // 清除定时器
      clearInterval(timer);
      timer = null;
      setSendText(`发送验证码`);
      setDisabled(false);
      return
    }
    setSendText(`${num}后重发`);
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

// React-Redux提供了connect方法，用于从 UI 组件生成容器组件
// connect的意思，就是将React UI组件与Redux store连接起来，生成一个新容器组件
export default connect(
  null,
  action.base
)(Login);