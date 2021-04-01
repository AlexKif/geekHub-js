import React, {useState} from 'react';
import {Button, Input, Modal} from "antd";
import {API} from "../../../../api";
import {useDispatch} from "react-redux";
import {setFolder} from "../../../../slices/fileManager";

const CreateFolder = (props) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleOk = () => {
    API.createFolder(name, props.path).then((res) => {
      setName('');
      handleCancel();
      dispatch(setFolder(res.data))
    });
  };

  const handleCancel = () => {
    props.onClose(false);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  }

  return (
    <Modal visible={props.showModal} onOk={handleOk} onCancel={handleCancel}>
      <h3>New folder</h3>
      <Input placeholder="Folder name" onChange={nameHandler} value={name}/>
    </Modal>
  );
};

export default CreateFolder;