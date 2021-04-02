export const setDataInLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}


export const getLSData = (key) => {
  return JSON.parse(localStorage.getItem(key));
}


