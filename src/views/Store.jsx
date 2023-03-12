import React from 'react';
import styled from 'styled-components';
import SkeletonAgain from '../components/SkeletonAgain';
import NavBarAgain from '../components/NavBarAgain';
import NewsItem from '../components/NewsItem';
import { SwipeAction } from 'antd-mobile';
import { connect } from 'react-redux';
import action from '../store/actions';

const Store = (props) => {
  let { list: storeList, queryStoreListAsync, removeStoreListById } = props;
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/
  const handleRemove = () => {};

  /** styles部分 **/
  const StoreBox = styled.div`
    .box {
      padding: 30px;
    }
  `;

  /** render **/
  return (
    <StoreBox>
      <NavBarAgain title="我的收藏"/>
      {storeList ?
        <div className="box">
          {storeList.map(item => {
            let { id, news } = item;
            return <SwipeAction key={id} rightActions={[{
              key: 'delete',
              text: '删除',
              color: 'danger',
              onClick: handleRemove.bind(null, id),
            }]}>
              <NewsItem info={news}/>
            </SwipeAction>;
          })}
        </div> :
        <SkeletonAgain/>
      }
    </StoreBox>
  );
};

export default connect(
  state => state.store,
  action.store,
)(Store);