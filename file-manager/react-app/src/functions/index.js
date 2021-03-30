import {notification} from "antd";
import {useEffect} from "react";

export const errorNotification = (message) => {
  notification.error({
    message: 'Error',
    description: message,
  });
};

export const successNotification = (message) => {
  notification.success({
    message: 'Success',
    description: message,
  });
};

export const useOutsideCallback = (ref, callBack) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) callBack();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
}