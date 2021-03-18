export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setInStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function updateStorage(key, data) {
  if (!Object.keys(data).length) {
    localStorage.removeItem(key);
  }
  setInStorage(key, { ...getFromStorage(key), ...data });
}

export default {
  get: getFromStorage,
  set: setInStorage,
  update: updateStorage,
};
