// local storage management helpers
export function getFromStorage(key: string): AppState {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

export function setInStorage(key: string, data: AppState): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function updateStorage(key: string, data: AppState): void {
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
