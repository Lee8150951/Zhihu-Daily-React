import React from 'react';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import './NavBarAgain.less';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const NavBarAgain = (props) => {
  let { title } = props;
  const navigate = useNavigate(),
    location = useLocation(),
    [usp] = useSearchParams();
  /** state部分 **/

  /** effect部分**/

  /** methods部分 **/
  const handleBack = () => {
    let to = usp.get('to');
    if (location.pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
      navigate(to, {replace: true});
      return;
    }
    navigate(-1);
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