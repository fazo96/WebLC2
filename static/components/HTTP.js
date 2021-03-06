let HTTP = {
  get (url, done) {
    let req = new window.XMLHttpRequest()
    req.open('GET', url, true)
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        let data
        try {
          data = JSON.parse(req.response)
        } catch (e) {
          data = req.response
        }
        done({
          data, code: req.status
        })
      }
    }
    req.send()
    return req
  },
  post (url, data, done) {
    let req = new window.XMLHttpRequest()
    req.open('POST', url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        let data
        try {
          data = JSON.parse(req.response)
        } catch (e) {
          data = req.response
        }
        done({
          data, code: req.status
        })
      }
    }
    console.log('POST', JSON.stringify(data))
    req.send(JSON.stringify(data))
    return req
  }
}

export default HTTP
