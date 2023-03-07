import React, { useMemo } from 'react';
import timg from '../assets/images/timg.jpg';
import './HomeHead.less';

const HomeHead = (props) => {
  let { today } = props;
  // 使用useMemo的好处在于：只有today发生变化的时候才需要计算时间的变化，不变的话不需要进行计算，实现优化
  let time = useMemo(() => {
    let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
      area = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    return {
      month: area[+month] + '月',
      day
    };
  }, [today])
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/

  /** styles部分 **/

  /** render **/
  return (
    <header className={"home-head-box"}>
      <div className="info">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className="title">知乎日报</h2>
      </div>
      <div className="picture">
        {/* 在jsx中需要引入静态图片不能使用相对地址，经过Webpack打包项目的目录会发生变化 */}
        <img src={timg} alt=""/>
      </div>
    </header>
  );
};

export default HomeHead;