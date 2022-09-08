export function generateUniqueId(){
  return Math.random().toString(16).slice(2)
}

export function getOrSetLocalStorageItem(key,value) {
  if (value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }else{
    return JSON.parse(window.localStorage.getItem(key));
  }
}


