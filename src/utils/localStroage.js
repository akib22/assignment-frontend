export const getDataFromLocalStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);

  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const setDataOnLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
};

export const removeDataFromLocalStorage = (key) => localStorage.removeItem(key);

export const clearDataFromLocalStorage = () => localStorage.clear();
