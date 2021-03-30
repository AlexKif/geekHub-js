import React, {useEffect} from 'react';
import './style.scss';
import {useSelector} from "react-redux";
import {FileUnknownOutlined, FolderFilled} from '@ant-design/icons';

const StructureList = (props) => {

  const {files} = useSelector((state) => state.fileManager);

  return (
    <ul className="files-list">
      {files.map((item, index) => {
        const isFile = item.split('.').length >= 2
        const isValidFormat = isFile && item.split('.').pop() === ('pdf' || 'doc' || 'docx' || 'png' || 'jpg' || 'mp3' || 'wav');
        if (!isFile) {
          return (
            <li key={index}
                title="Double click to open"
                className="files-list__item"
                onContextMenuCapture={() => props.listContextHandler(item)}
                onDoubleClick={(e) => props.listDbClickHandler(e, item)}>
              <FolderFilled /><span className="files-list__folder">{item}</span>
            </li>
          )
        } else {
          return (
            <li key={index}
                title="Double click to download"
                className="files-list__item"
                onContextMenuCapture={() => props.listContextHandler(item)}
                onDoubleClick={(e) => props.listDbClickHandler(e, item)}>
              {isValidFormat ? <span className="files-list__format">{item.split('.').pop()}</span>: <FileUnknownOutlined />} <span className="files-list__file">{item}</span>
            </li>
          )
        }
      })}
    </ul>
  );
};

export default StructureList;