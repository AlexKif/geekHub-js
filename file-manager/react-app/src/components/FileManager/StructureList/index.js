import React, {useEffect} from 'react';
import './style.scss';
import {useSelector} from "react-redux";
import {FileUnknownOutlined, FolderFilled} from '@ant-design/icons';

const StructureList = (props) => {

  const {files, path} = useSelector((state) => state.fileManager);

  return (
    <>
      {path.length ? <span onDoubleClick={props.goBack} className="go-back-path" title="go back">...</span>: null}
      <ul className="files-list">
        {files.map((item, index) => {
          const isValidFormat = item.type === 'file' && item.name.split('.').pop() === ('pdf' || 'doc' || 'docx' || 'png' || 'jpg' || 'mp3' || 'wav');
          if (item.type === 'folder') {
            return (
              <li key={index}
                  title="Double click to open"
                  className="files-list__item"
                  onContextMenuCapture={() => props.listContextHandler(item)}
                  onDoubleClick={(e) => props.listDbClickHandler(e, item)}>
                <FolderFilled /><span className="files-list__folder">{item.name}</span>
              </li>
            )
          } else {
            return (
              <li key={index}
                  title="Double click to download"
                  className="files-list__item"
                  onContextMenuCapture={() => props.listContextHandler(item)}
                  onDoubleClick={(e) => props.listDbClickHandler(e, item)}>
                {isValidFormat ? <span className="files-list__format">{item.name.split('.').pop()}</span>: <FileUnknownOutlined />} <span className="files-list__file">{item.name}</span>
              </li>
            )
          }
        })}
      </ul>
    </>
  );
};

export default StructureList;