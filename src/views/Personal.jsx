import React from 'react';
import { RightOutline } from 'antd-mobile-icons';
import { Link } from 'react-router-dom';
import NavBarAgain from '../components/NavBarAgain';
import { connect } from 'react-redux';
import action from '../store/actions';
import './Personal.less';

const Personal = (props) => {
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/
  const signout = () => {
  };

  /** render **/
  return (
    <div className={"personal-box"}>
      <NavBarAgain title="个人中心"/>
      <div className="baseInfo">
        <Link to="/update">
          <img className="pic" alt=""/>
          <p className="name">姓名</p>
        </Link>
      </div>
      <div>
        <Link to="/store" className="tab">
          我的收藏
          <RightOutline/>
        </Link>
        <div className="tab" onClick={signout}>
          退出登录
          <RightOutline/>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => state.base,
  {
    clearUserInfo: action.base.clearUserInfo,
    clearStoreList: action.store.clearStoreList
  }
)(Personal);