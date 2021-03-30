import React, {useState} from 'react';
import {Button, Input, Modal} from "antd";
import {API} from "../../../../api";

const CreateFolder = (props) => {
  const [name, setName] = useState('');

  const handleOk = () => {
    API.createFolder(name).then((res) => {
      setName('');
      handleCancel();
      console.log(res.data);
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