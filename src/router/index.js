import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import routes from './router';
import { Mask, DotLoading, Toast } from 'antd-mobile';
import store from '../store';
import action from '../store/actions';

/* 统一路由配置 */
const isCheckLogin = (path) => {
  let { base: { info } } = store.getState(),
    checkList = ['/personal', '/store', '/update'];
  return !info && checkList.includes(path);
};
const Element = function Element(props) {
  let { component: Component, meta, path } = props;
  let isShow = !isCheckLogin(path);
  let [_, setRandom] = useState(0);

  // 修改页面的TITLE
  let { title = '知乎日报-WebApp' } = meta || {};
  document.title = title;

  // 获取路由信息,基于属性传递给组件
  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  /** effect部分 **/
  useEffect(() => {
    if (isShow) return;
    (async () => {
      let infoAction = await action.base.queryUserInfoAsync();
      let info = infoAction.info;
      if (!info) {
        // 如果获取后还是不存在:没有登录
        Toast.show({
          icon: 'fail',
          content: '请先登录',
        });
        // 跳转到登录页
        navigate({
          pathname: '/login',
          search: `?to=${path}`,
        }, { replace: true });
        return;
      }
      // 如果获取到了信息,说明是登录的,我们派发任务把信息存储到容器中
      store.dispatch(infoAction);
      setRandom(+new Date());
    })();
  });

  /** render **/
  return (
    <div>
      {isShow ?
        <Component navigate={navigate} location={location} params={params} usp={usp}/> :
        <Mask visible={true}>
          <DotLoading color="white"/>
        </Mask>
      }
    </div>
  );
};

export default function RouterView() {
  return (
    <Suspense fallback={
      <Mask visible={true}>
        <DotLoading color="white"/>
      </Mask>
    }>
      <Routes>
        {routes.map(item => {
          let { name, path } = item;
          return (
            /* Element不能返回Promise实例 */
            <Route key={name} path={path} element={<Element {...item} />}/>
          );
        })}
      </Routes>
    </Suspense>
  );
};