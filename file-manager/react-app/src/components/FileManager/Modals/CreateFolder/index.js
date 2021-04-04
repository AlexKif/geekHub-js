import React, {useCallback, useState} from 'react';
import {Button, Input, Modal} from "antd";
import {API} from "../../../../api";
import {useDispatch} from "react-redux";
import {setFolder} from "../../../../slices/fileManager";

const CreateFolder = (props) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleOk = useCallback(() => {
    API.createFolder(name, props.path).then((res) => {
      setName('');
      handleCancel();
      dispatch(setFolder(res.data))
    });
  }, [name, props.path])

  const handleCancel = useCallback(() => {
    props.onClose(false);
  }, [])

  const nameHandler = useCallback((e) => {
    setName(e.target.value);
  }, [])

  return (
    <Modal visible={props.showModal} onOk={handleOk} onCancel={handleCancel}>
      <h3>New folder</h3>
      <Input placeholder="Folder name" onChange={nameHandler} value={name}/>
    </Modal>
  );
};

export default CreateFolder;