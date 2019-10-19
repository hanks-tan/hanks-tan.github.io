const util = {
  loadStyle (cssPath) {
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.href = cssPath
    link.rel = 'stylesheet'
    
    head.appendChild(link)
  },
  romoveStyle(cssPath){
    let links = document.getElementsByTagName('link')
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      if(element.getAttribute('href') === cssPath){
        let head = document.getElementsByTagName('head')[0]
        head.removeChild(element)
      }
    }
  }
}

export default util