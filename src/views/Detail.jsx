import React, { useEffect, useState } from 'react';
import { LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline } from 'antd-mobile-icons';
import { Badge } from 'antd-mobile';
import './Detail.less';
import api from '../api';
import SkeletonAgain from '../components/SkeletonAgain';
import { flushSync } from 'react-dom';

const Detail = (props) => {
  let { navigate, params } = props;
  let link;
  /** state部分 **/
  let [info, setInfo] = useState(null),
    [extra, setExtra] = useState(null);

  /** effect部分 **/
  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryNewsInfo(params.id);
        flushSync(() => {
          setInfo(result);
          // 处理样式
          handleStyle(result);
        });
        // 处理图片
        handleImage(result);
      } catch (_) {}
    })();
    // 销毁时移除CSS
    return () => {
      if (link) document.head.removeChild(link);
    };
  }, []);

  // 并行请求
  useEffect(() => {
    (async () => {
      try {
        let result = await api.queryStoryExtra(params.id);
        setExtra(result);
      } catch (_) {}
    })();
  }, []);

  /** methods部分 **/
  // 处理样式
  const handleStyle = (result) => {
    let { css } = result;
    if (!Array.isArray(css)) return;
    css = css[0];
    if (!css) return;
    // 创建link标签，动态引入css
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);
  };
  const handleImage = (result) => {
    let imgPlaceHolder = document.querySelector('.img-place-holder');
    if (!imgPlaceHolder) return;
    // 创建大图
    let tempImg = new Image;
    tempImg.src = result.image;
    tempImg.onload = () => {
      imgPlaceHolder.appendChild(tempImg);
    };
    tempImg.onerror = () => {
      let parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    }
  };

  /** styles部分 **/

  /** render **/
  return (
    <div className={'detail-box'}>
      {/* 新闻内容 */}
      {!info ? <SkeletonAgain/> :
        <div className="content" dangerouslySetInnerHTML={{
          __html: info.body,
        }}></div>
      }

      {/* 底部图标 */}
      <div className="tab-bar">
        <div className="back" onClick={() => {
          navigate(-1);
        }}>
          <LeftOutline/>
        </div>
        <div className="icons">
          <Badge content={extra ? extra.comments : 0}><MessageOutline/></Badge>
          <Badge content={extra ? extra.popularity : 0}><LikeOutline/></Badge>
          <span className={'stored'}><StarOutline/></span>
          <span><MoreOutline/></span>
        </div>
      </div>
    </div>
  );
};

export default Detail;