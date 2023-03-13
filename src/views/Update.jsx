import React, { useState } from 'react';
import ButtonAgain from '../components/ButtonAgain';
import NavBarAgain from '../components/NavBarAgain';
import './Update.less';
import { connect } from 'react-redux';
import action from '../store/actions';
import { ImageUploader, Input, Toast } from 'antd-mobile';
import api from '../api';

const Update = (props) => {
  let { info, queryUserInfoAsync, navigate } = props;
  /** state部分 **/
  let [pic, setPic] = useState([{url: info.pic}]),
    [username, setUsername] = useState(info.name);

  /** effect部分 **/

  /** methods部分 **/
  // 提交信息
  const submit = async () => {
    if (pic.length === 0) {
      Toast.show({
        icon: 'fail',
        content: '请先上传图片'
      });
      return;
    }
    if (username.trim() === "") {
      Toast.show({
        icon: 'fail',
        content: '请先输入账号'
      });
      return;
    }
    let [{ url }] = pic;
    try {
      let { code } = await api.userUpdate(username.trim(), url);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '更新失败'
        });
        return;
      }
      Toast.show({
        icon: 'success',
        content: '修改信息成功'
      });
      queryUserInfoAsync();
      navigate(-1);
    } catch (_) {}
  };

  // 图片上传
  const limitImage = (file) => {
    let limit = 1024 * 1024;
    if (file.size > limit) {
      Toast.show({
        icon: 'fail',
        content: '图片必须在1Mb以内'
      });
      return null;
    }
    return file;
  };
  const uploadImage = async (file) => {
    let temp;
    try {
      let { code, pic } = await api.upload(file);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '上传失败'
        });
        return;
      }
      temp = pic
      setPic([{ url: pic }]);
    } catch (_) {}
    return { url: temp }
  };

  const changeHandle = (e) => {
    setUsername(e);
  };

  /** render **/
  return (
    <div className={"update-box"}>
      <NavBarAgain title="修改信息"/>
      <div className="formBox">
        <div className="item">
          <div className="label">头像</div>
          <div className="input">
            <ImageUploader maxCount={1}
                           onDelete={() => {setPic([])}}
                           value={pic} upload={uploadImage} beforeUpload={limitImage}/>
          </div>
        </div>
        <div className="item">
          <div className="label">姓名</div>
          <div className="input">
            <Input placeholder="请输入账号名称" value={username} onChange={changeHandle}/>
          </div>
        </div>
        <ButtonAgain color="primary" className="submit" onClick={submit}>
          提交
        </ButtonAgain>
      </div>
    </div>
  );
};

export default connect(
  state => state.base,
  action.base,
)(Update);