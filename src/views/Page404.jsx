import React from 'react';
import { ErrorBlock, Button } from 'antd-mobile';
import styled from 'styled-components';

const Page404 = (props) => {
  let { navigate } = props;
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/

  /** styles部分 **/
  const Page404Box = styled.div`
    padding-top: 100px;
    font-size: 40px;

    .adm-error-block-image {
      height: 400px;
    }

    .adm-error-block-description,
    .adm-error-block-description-title {
      font-size: 28px;
    }

    .btn {
      margin-top: 50px;
      display: flex;
      justify-content: center;

      .adm-button {
        margin: 0 20px;
      }
    }
  `;

  /** render **/
  return (
    <Page404Box>
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
    </Page404Box>
  );
};

export default Page404;