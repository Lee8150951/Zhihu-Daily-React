import React from 'react';
import ButtonAgain from '../components/ButtonAgain';
import NavBarAgain from '../components/NavBarAgain';
import './Update.less';
import { connect } from 'react-redux';
import action from '../store/actions';
import { ImageUploader, Input, Toast } from 'antd-mobile';

const Update = (props) => {
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/

  /** render **/
  return (
    <div className={"update-box"}>
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
    </div>
  );
};

export default connect(
  state => state.base,
  action.base,
)(Update);