import React, { useEffect, useState } from 'react';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import './NavBarAgain.less';

const NavBarAgain = (props) => {
  let { title } = props
  /** state部分 **/

  /** effect部分**/

  /** methods部分 **/
  const handleBack = () => {
    // ...
  };

  /** styles部分 **/

  /** render **/
  return (
    <NavBar className={"navbar-again-box"} onBack={handleBack}>
      {title}
    </NavBar>
  );
};

// 配置默认title
NavBarAgain.defaultProps = {
  title: '个人中心'
};
NavBarAgain.propTypes = {
  title: PropTypes.string
};

export default NavBarAgain;