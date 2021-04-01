import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import CustomContextMenu from "./ContextMenu";
import {useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import StructureList from "./StructureList";
import {API} from "../../api";
import CreateFolder from "./Modals/CreateFolder";
import {useDispatch, useSelector} from "react-redux";
import {removeLastPath, setFile, setFlies, setPath} from "../../slices/fileManager";

const FileManager = () => {
  const [tempData, setTempData] = useState(null);
  const [contextItems, setContextItems] = useState(['Create folder', 'Upload file']);
  const [contextAction, setContextAction] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {path} = useSelector((state) => state.fileManager);
  const inputFile = useRef(null)

  useEffect(() => {
    API.getFilesByPath().then(res => {
      dispatch(setFlies(res.data.files));
    });
  }, [])

  function handleItemClick({ event }){
    // console.log(event.currentTarget.id)
    switch (event.currentTarget.id) {
      case 'createfolder':
        setCreateIsOpen(true);
        break;
      case 'uploadfile':
        inputFile.current.click();
        break;
    }
  }

  const { show } = useContextMenu({
    /*Why not)*/
    id: '🤣'
  });

  const contextMenuHandler = (e) => {
    const className = e.target.className
    if (tempData && e.target.className !== 'files-list__item') {
      return setContextItems(['Paste'])
    }
    if (className === 'files-list__item' || className === 'files-list__file' || className === 'files-list__folder') {
      setContextItems(['Copy', 'Cut', 'Delete', 'Rename'])
    } else {
      setContextItems(['Create folder', 'Upload file'])
    }
  }

  const listContextHandler = (item) => {
    console.log(item)
    setSelectedItem(item)
  }

  const listDbClickHandler = (e, item) => {
    if (item.type === 'folder') {
      API.getFilesByPath([...path, item.name]).then(res => {
        dispatch(setFlies(res.data.files));
        dispatch(setPath(item.name));
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

  return (
    <div className="file-manager">
      <div onContextMenu={show} className="file-manager__wrapper" onContextMenuCapture={contextMenuHandler}>
        <StructureList listContextHandler={listContextHandler} listDbClickHandler={listDbClickHandler} goBack={goBack}/>
      </div>
      <CustomContextMenu items={contextItems} onChange={handleItemClick}/>
      <CreateFolder showModal={createIsOpen} onClose={setCreateIsOpen} contextAction={contextAction} path={path}/>
      <input type='file' name="file-uploader" onChange={uploadHandler} id='file' multiple ref={inputFile} style={{display: 'none'}}/>
    </div>
  );
};

export default FileManager;