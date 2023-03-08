import React, { useEffect, useState } from 'react';
import { Button } from 'antd-mobile';

const ButtonAgain = (props) => {
  let options = { ...props };
  let { children, onClick: handle } = options;
  delete options.children;

  /** state部分 **/
  let [loading, setLoading] = useState(false);

  /** effect部分 **/

  /** methods部分 **/
  const clickHandle = async () => {
    setLoading(true);
    try {
      await handle();
    } catch (_) {}
    setLoading(false);
  };

  // 如果没有传过来onClick方法，手动赋值
  if (handle) {
    options.onClick = clickHandle;
  }

  /** render **/
  return (
    <Button {...options} loading={loading}>
      {children}
    </Button>
  );
};

export default ButtonAgain;