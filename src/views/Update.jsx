import React from 'react';
import ButtonAgain from '../components/ButtonAgain';
import NavBarAgain from '../components/NavBarAgain';
import styled from 'styled-components';
import { connect } from 'react-redux';
import action from '../store/actions';
import { ImageUploader, Input, Toast } from 'antd-mobile';

const Update = (props) => {
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/

  /** styles部分 **/
  const UpdateBox = styled.div`
    .formBox {
      padding: 30px;
      .item {
        display: flex;
        align-items: center;
        height: 110px;
        line-height: 110px;
        font-size: 28px;
        .label {
          width: 20%;
          text-align: center;
        }
        .input {
          width: 80%;
        }
      }
    }
    .submit {
      display: block;
      margin: 0 auto;
      width: 60%;
      height: 70px;
      font-size: 28px;
    }
  `;

  /** render **/
  return (
    <UpdateBox>
      <NavBarAgain title="修改信息"/>
      <div className="formBox">
        <div className="item">
          <div className="label">头像</div>
          <div className="input">
            <ImageUploader/>
          </div>
        </div>
        <div className="item">
          <div className="label">姓名</div>
          <div className="input">
            <Input placeholder="请输入账号名称"/>
          </div>
        </div>
        <ButtonAgain color="primary" className="submit">
          提交
        </ButtonAgain>
      </div>
    </UpdateBox>
  );
};

export default connect(
  state => state.base,
  action.base,
)(Update);