import {notification} from "antd";

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