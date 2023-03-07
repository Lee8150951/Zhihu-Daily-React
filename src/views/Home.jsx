import React, { useEffect, useState } from 'react';
import HomeHead from '../components/HomeHead';
import _ from '../assets/utils';
import './Home.less';
import { Swiper } from 'antd-mobile';
import { Link } from 'react-router-dom';
import api from '../api';

export const Home = (props) => {
  /** state部分 **/
  let [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}")),
    [bannerData, setBannerData] = useState([]);

  /** effect部分 **/
  // 第一次渲染完毕，向服务器发送请求
  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
      } catch (_) { }
    })();
  }, []);

  /** methods部分 **/

  /** styles部分 **/

  /** render **/
  return (
    <div className={"home-box"}>
      {/* 头部 */}
      <HomeHead today={today}/>

      {/* 轮播图 */}
      <div className="swiper-box">
        {/* 如果不存在bannerData信息时不渲染Swiper */}
        { bannerData.length > 0 ? <Swiper autoplay={true} loop={true}>
          { bannerData.map(item => {
            let { id, image, title, hint } = item;
            return (
              <Swiper.Item key={id}>
                <Link to={{pathname: `/detail/${id}`}}>
                  <img src={image} alt=""/>
                  <div className="desc">
                    <h3 className="title">{title}</h3>
                    <p className="author">{hint}</p>
                  </div>
                </Link>
              </Swiper.Item>
            );
          }) }
        </Swiper> : null }
      </div>
    </div>
  );
};