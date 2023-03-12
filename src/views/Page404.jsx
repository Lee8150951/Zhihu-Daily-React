import React from 'react';
import { ErrorBlock, Button } from 'antd-mobile';
import './Page404.less';

const Page404 = (props) => {
  let { navigate } = props;
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/

  /** render **/
  return (
    <div className={"page404-box"}>
      <ErrorBlock status="empty" title="您访问的页面不存在" description="去逛逛其他页面吧"/>
      <div className="btn">
        <Button color="warning"
                onClick={() => {
                  navigate(-1);
                }}>
          返回上一页
        </Button>

        <Button color="primary"
                onClick={() => {
                  navigate('/', { replace: true });
                }}>
          回到首页
        </Button>
      </div>
    </div>
  );
};

export default Page404;