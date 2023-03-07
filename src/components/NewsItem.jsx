import React from 'react';
import './NewsItem.less';
import { Image } from 'antd-mobile';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewsItem = (props) => {
  let { info } = props;
  if (!info) return null;
  let { id, title, hint, images } = info;
  if (!Array.isArray(images)) images = [''];
  /** state部分 **/

  /** effect部分 **/

  /** methods部分 **/

  /** styles部分 **/

  /** render **/
  return (
    <div className={'news-item-box'}>
      <Link to={{ pathname: `/detail/${id}` }}>
        <div className="content">
          <h4 className="title">{title}</h4>
          <p className="author">{hint}</p>
          <Image src={images[0]} lazy={true}/>
        </div>
      </Link>
    </div>
  );
};

// 规则校验
NewsItem.defaultProps = {
  info: null,
};
NewsItem.defaultProps = {
  info: PropTypes.object,
};

export default NewsItem;