import React, {useEffect, useRef, useState} from 'react';
import './style.scss';
import {useSelector} from "react-redux";
import {FileUnknownOutlined, FolderFilled} from '@ant-design/icons';
import {bytesToSize} from "../../../helpers/common";
import {API} from "../../../api";

const StructureList = (props) => {

  const {files, path} = useSelector((state) => state.fileManager);
  const [showPreview, setShowPreview] = useState(false);
  const [encodedImage, setEncodedImage] = useState({});
  const [isSent, setIsSent] = useState(false);

  const mouseEnterHandler = (file) => {
    setEncodedImage({});
    const format = file.name.split('.').pop();
    if (!isSent && file.type === 'file' && (format === 'png' || format ==='jpg')) {
      setShowPreview(true);
      setIsSent(true);
      API.downloadFile(file.name, path)
        .then(res => {
          setEncodedImage({image: res.data.file, id: file.id});
          setIsSent(false);
        })
        .catch(err => {
          setIsSent(false);
        })
    }
  }

  const mouseLeaveHandler = () => {
    setShowPreview(false);
  }

  return (
    <>
      {path.length ? <span onDoubleClick={props.goBack} className="go-back-path" title="go back">...</span>: null}
      <ul className="files-list">
        {files?.map((item, index) => {
          const format = item.name.split('.').pop();
          const isValidFormat = item.type === 'file' && ( format === 'pdf' || format === 'doc' || format === 'docx' || format === 'png' || format === 'jpg' || format === 'mp3' || format === 'wav');
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

                {isValidFormat ?
                  <span className="files-list__format">{item.name.split('.').pop()}</span> :
                  <FileUnknownOutlined />
                }
                <span className="files-list__file" onMouseEnter={() => mouseEnterHandler(item)} onMouseLeave={mouseLeaveHandler}>
                  {item.name}
                  {showPreview && encodedImage.id === item.id &&
                    <span className="files-list__preview">
                      <img src={`data:image/png;base64,${encodedImage.image}`} alt="image-preview"/>
                    </span>
                  }
                </span>
                <span className="files-list__size">{bytesToSize(item.size)}</span>
              </li>
            )
          }
        })}
      </ul>
    </>
  );
};

export default StructureList;