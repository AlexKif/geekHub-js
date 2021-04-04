import React, {useEffect, useState} from 'react';
import {Input, Modal} from "antd";
import {API} from "../../../../api";
import {useDispatch} from "react-redux";
import {renameItem} from "../../../../slices/fileManager";
import {successNotification} from "../../../../functions";

const RenameModal = (props) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setName(convertedName(props.selectedItem))
  }, [props.selectedItem])

  function convertedName(item) {
    if (item.name) {
      if (item.type === 'folder') {
        return item.name
      } else {
        return item.name.replace(/\.[^/.]+$/, "")
      }
    }
  }

  const handleOk = () => {
    const item = props.selectedItem.name.split('.');
    const format = item.pop();
    const isFile = props.selectedItem.type === 'file';
    const newName = isFile ? `${name}.${format}`: name
    API.renameItem(props.path, props.selectedItem.name, newName).then((res) => {
      if (res.status === 200) {
        handleCancel();
        dispatch(renameItem({...props.selectedItem, name: res.data.newName}))
        successNotification(`${isFile ? 'File': 'Folder'} was renamed`)

      }
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
      <h3>Rename</h3>
      <Input placeholder="Folder name" onChange={nameHandler} value={name}/>
    </Modal>
  );
};

export default RenameModal;