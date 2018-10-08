'use strict'

function storageAvailable (type) {
  try {
    var storage = window[type]
    let x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
  }
}

function save (id, json) {
  if (storageAvailable('sessionStorage')) {
    sessionStorage.setItem(id, json)
  } else {
    console.warn('sessionStorage is not available. The site might not work as expected.')
  }
}

export { save }
