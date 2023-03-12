import React, { useEffect, useState, useMemo } from 'react';
import { LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline } from 'antd-mobile-icons';
import { Badge, Toast } from 'antd-mobile';
import './Detail.less';
import api from '../api';
import SkeletonAgain from '../components/SkeletonAgain';
import { flushSync } from 'react-dom';
import { connect } from 'react-redux';
import action from '../store/actions';

const Detail = (props) => {
  let { navigate, params } = props;
  let link;
  let { base: { info: userInfo }, queryUserInfoAsync, location, store: { list: storeList }, queryStoreListAsync, removeStoreListById } = props;

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

  // 同步登录者信息
  useEffect(() => {
    (async () => {
      // 登录信息如果不存在则同步登录信息
      if (!userInfo) {
        let { info } = await queryUserInfoAsync();
        userInfo = info;
      }
      // 如果已经登录且没有收藏信息则进行同步
      if (userInfo && !storeList) {
        queryStoreListAsync();
      }
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

  const handleStore = async () => {
    if (!userInfo) {
      Toast.show({
        icon: 'fail',
        content: '请先登录'
      });
      navigate(`/login?to=${location.pathname}`, { replace: true });
      return;
    }
    if (isStore) {
      let item = storeList.find(item => {
        return +item.news.id === +params.id;
      });
      if (!item) return;
      let { code } = await api.storeRemove(item.id);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '收藏失败'
        });
        return;
      }
      Toast.show({
        icon: 'success',
        content: '收藏成功'
      });
      removeStoreListById(item.id); // 从redux中移除
      return;
    }
    try {
      let { code } = await api.store(params.id);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '收藏失败'
        });
        return;
      }
      Toast.show({
        icon: 'success',
        content: '收藏成功'
      });
      queryStoreListAsync(); // 同步最新收藏列表
    } catch (_) {}
  }

  // 判断当前是否被收藏
  const isStore = useMemo(() => {
    if (!storeList) return false;
    return storeList.some(item => {
      return +item.news.id === +params.id;
    });
  }, [storeList, params]);

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
          <span className={isStore ? 'stored' : ''} onClick={handleStore}><StarOutline/></span>
          <span><MoreOutline/></span>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => {
    return {
      base: state.base,
      store: state.store
    };
  },
  {
    ...action.base,
    ...action.store
  }
)(Detail);