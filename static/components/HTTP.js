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
  }
}

export default HTTP
