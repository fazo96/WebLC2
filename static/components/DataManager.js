let DataManager = {
  save (name, value) {
    if (this.isAvailable()) {
      if (typeof value === 'object') value = JSON.stringify(value)
      window.localStorage.setItem(name, value)
      return true
    }
    return false
  },
  load (name) {
    if (this.isAvailable()) {
      let loaded = window.localStorage.getItem(name)
      let obj
      try {
        obj = JSON.parse(loaded)
      } catch (e) {
        return loaded
      }
      return obj || loaded
    }
  },
  set (name, prop, value) {
    if (this.isAvailable()) {
      let obj = this.load(name) || {}
      if (typeof obj !== 'object') obj = {}
      if (typeof value === 'object') {
        obj[prop] = JSON.stringify(value)
      } else {
        obj[prop] = value
      }
      this.save(name, obj)
    }
  },
  isAvailable () {
    return window && window.localStorage
  }
}

export default DataManager
