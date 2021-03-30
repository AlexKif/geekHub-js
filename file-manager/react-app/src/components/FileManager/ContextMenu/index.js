import React from 'react';
import './style.scss';
import {Item, Menu} from "react-contexify";

const CustomContextMenu = (props) => {
  return (
    <Menu id="🤣">
      {props.items.map((item, index) => {
        return (
          <Item onClick={props.onChange} key={index} id={item.toLowerCase().replace(' ', '')}>
            {item}
          </Item>
        )
      })}
    </Menu>
  )
};

export default CustomContextMenu;