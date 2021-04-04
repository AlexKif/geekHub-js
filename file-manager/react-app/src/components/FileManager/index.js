import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import CustomContextMenu from "./ContextMenu";
import {useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import StructureList from "./StructureList";
import {API} from "../../api";
import CreateFolder from "./Modals/CreateFolder";
import {useDispatch, useSelector} from "react-redux";
import {removeLastPath, setFile, setFlies, setPath, deleteItem, setFolder} from "../../slices/fileManager";
import {successNotification} from "../../functions";
import RenameModal from "./Modals/RenameModal";

const FileManager = () => {
  const dispatch = useDispatch();
  const {path} = useSelector((state) => state.fileManager);
  const inputFile = useRef(null);

  /*Copy and Cut*/
  const [tempData, setTempData] = useState(null);
  const [fromPath, setFromPath] = useState([]);
  /*End*/

  /*Context menu*/
  const [contextItems, setContextItems] = useState(['Create folder', 'Upload file']);
  const [contextAction, setContextAction] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  /*End*/

  /*Modals*/
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [renameIsOpen, setRenameIsOpen] = useState(false);
  /*End*/

  useEffect(() => {
    API.getFilesByPath().then(res => {
      dispatch(setFlies(res.data.files));
    });
  }, [])

  function handleItemClick({ event }) {
    setContextAction(event.currentTarget.id)
    switch (event.currentTarget.id) {
      case 'createfolder':
        setCreateIsOpen(true);
        break;
      case 'uploadfile':
        inputFile.current.click();
        break;
      case 'delete':
        deleteHandler();
        break;
      case 'cut':
      case 'copy':
        moveHandler();
        break;
      case 'paste':
        insertHandler();
        break;
      case 'rename':
        setRenameIsOpen(true);
        break;
    }
  }

  const { show } = useContextMenu({
    /*Why not)*/
    id: '🤣'
  });

  const contextMenuHandler = (e) => {
    const className = e.target.className
    if (tempData && className !== 'files-list__item' && className !== 'files-list__file' && className !== 'files-list__folder') {
      return setContextItems(['Paste'])
    }
    if (className === 'files-list__item' || className === 'files-list__file' || className === 'files-list__folder') {
      return setContextItems(['Copy', 'Cut', 'Delete', 'Rename'])
    } else {
      return setContextItems(['Create folder', 'Upload file'])
    }
  }

  const moveHandler = () => {
    setFromPath(path);
    setTempData(selectedItem);
  }

  const insertHandler = () => {
    const action = contextAction === 'cut' ? 'cut': 'copy';
    API.moveItem(tempData.name, fromPath, path, action).then(res => {
      setTempData(null);
      const isFile = res.data[0].type === 'file'
      dispatch(isFile ? setFile(res.data): setFolder(res.data[0]))
      successNotification(`${isFile ? 'File': 'Folder'} was ${action === 'cut' ? 'moved': 'copied'}`)
    });
  }

  const listContextHandler = (item) => {
    setSelectedItem(item)
  }

  const listDbClickHandler = (e, item) => {
    if (item.type === 'folder') {
      API.getFilesByPath([...path, item.name]).then(res => {
        dispatch(setFlies(res.data.files));
        dispatch(setPath(item.name));
      });
    } else {
      API.downloadFile(item.name, path)
        .then(res => {
          // window.open('data:application/octet-stream;base64,' + res.data.file, '_blank');
          const link = document.createElement("a");
          link.href = 'data:application/octet-stream;base64,' + res.data.file;
          link.download = item.name;
          link.click();
        });
    }
  }

  const goBack = () => {
    const tempPath = [...path];
    tempPath.pop();
    API.getFilesByPath(tempPath).then(res => {
      dispatch(setFlies(res.data.files));
      dispatch(removeLastPath());
    });
  }

  const deleteHandler = () => {
    API.deleteItem(selectedItem.name, path).then(res => {
      if (res.status === 200) {
        dispatch(deleteItem(selectedItem));
        const isFile = selectedItem.type === 'file'
        successNotification(`${isFile ? 'File': 'Folder'} was deleted`)
      }
    });
  }

  const uploadHandler = (e) => {
    const data = e.target.files
    const files = new FormData();
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        files.append('file', data[i])
      }
      API.uploadFile(files, path).then(res => {
        dispatch(setFile(res.data.files))
      })
    }
  }

  /*Reset input value and call onChange */
  const fileClickHandler = (e) => {
    e.target.value = null;
  }

  return (
    <div className="file-manager">
      <div onContextMenu={show} className="file-manager__wrapper" onContextMenuCapture={contextMenuHandler}>
        <StructureList listContextHandler={listContextHandler} listDbClickHandler={listDbClickHandler} goBack={goBack}/>
      </div>
      <CustomContextMenu items={contextItems} onChange={handleItemClick}/>
      <CreateFolder showModal={createIsOpen} onClose={setCreateIsOpen} path={path}/>
      <RenameModal selectedItem={selectedItem} showModal={renameIsOpen} onClose={setRenameIsOpen} path={path}/>
      <input type='file' name="file-uploader" onClick={fileClickHandler} onChange={uploadHandler} id='file' multiple ref={inputFile} style={{display: 'none'}}/>
    </div>
  );
};

export default FileManager;