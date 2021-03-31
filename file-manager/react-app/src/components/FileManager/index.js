import React, {useEffect, useState} from 'react';
import './style.scss';
import CustomContextMenu from "./ContextMenu";
import {useContextMenu} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import StructureList from "./StructureList";
import {API} from "../../api";
import CreateFolder from "./Modals/CreateFolder";
import {useDispatch, useSelector} from "react-redux";
import {removeLastPath, setFlies, setPath} from "../../slices/fileManager";

const FileManager = () => {
  const [tempData, setTempData] = useState(null);
  const [contextItems, setContextItems] = useState(['Create folder', 'Upload file']);
  const [contextAction, setContextAction] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {path} = useSelector((state) => state.fileManager);

  useEffect(() => {
    API.getFilesByPath().then(res => {
      dispatch(setFlies(res.data.files));
    });
  }, [])

  function handleItemClick({ event }){
    switch (event.currentTarget.id) {
      case 'createfolder':
        setCreateIsOpen(true);
        break;
    }
  }

  const { show } = useContextMenu({
    /*Why not)*/
    id: '🤣'
  });

  const contextMenuHandler = (e) => {
    const className = e.target.className
    console.log(className)
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

  return (
    <div className="file-manager">
      <h1>Upload your first file or folder. Press the right button of your mouse to start</h1>
      <div onContextMenu={show} className="file-manager__wrapper" onContextMenuCapture={contextMenuHandler}>
        <StructureList listContextHandler={listContextHandler} listDbClickHandler={listDbClickHandler} goBack={goBack}/>
      </div>
      <CustomContextMenu items={contextItems} onChange={handleItemClick}/>
      <CreateFolder showModal={createIsOpen} onClose={setCreateIsOpen} contextAction={contextAction}/>
    </div>
  );
};

export default FileManager;