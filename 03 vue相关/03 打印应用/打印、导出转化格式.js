import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

const pdfWidth = 595
const pdfHeight = 842

export default {
  async canvasToImage({ element, scale = 4 }) {
    return new Promise((resolve, reject) => {
      html2Canvas(element, {
        allowTaint: true,
        scale: scale,
        logging: true,
        imageTimeout: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      })
        .then(canvas => {
          let image = canvas.toDataURL('image/jpeg', 1)
          resolve(image)
        })
        .catch(e => reject(e))
    })
  },

  imageToPdf(img, canvasWidth, canvasHeight) {
    return new Promise(resolve => {
      let paras = document.body.getElementsByClassName('auto-print-frame')
      for (let i = 0; i < paras.length; i++) {
        //删除元素 元素.parentNode.removeChild(元素);
        if (paras[i] != null) paras[i].parentNode.removeChild(paras[i])
      }

      let contentWidth = canvasWidth
      let contentHeight = canvasHeight
      let pageHeight = (contentWidth / pdfWidth) * pdfHeight
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = pdfWidth
      let imgHeight = (pdfWidth / contentWidth) * contentHeight

      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(img, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= pdfHeight
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      resolve(PDF)
    })
  },

  getPdf({ img, canvasWidth, canvasHeight, fileName = 'none.pdf' }) {
    return new Promise((resolve, reject) => {
      this.imageToPdf(img, canvasWidth, canvasHeight)
        .then(async PDF => {
          await PDF.save(`${fileName}`, {
            returnPromise: true
          })
          resolve()
        })
        .catch(error => reject(error))
    })
  },

  getPrint({ img, canvasWidth, canvasHeight }) {
    return new Promise((resolve, reject) => {
      this.imageToPdf(img, canvasWidth, canvasHeight)
        .then(PDF => {
          PDF.autoPrint()
          let hiddFrame = document.createElement('iframe')
          hiddFrame.className = 'auto-print-frame'
          hiddFrame.style.position = 'fixed'
          hiddFrame.style.width = '1px'
          hiddFrame.style.height = '1px'
          hiddFrame.style.opacity = '0.01'
          const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
          if (isSafari) {
            // fallback in safari
            hiddFrame.onload = () => {
              try {
                hiddFrame.contentWindow.document.execCommand('print', false, null)
              } catch (e) {
                hiddFrame.contentWindow.print()
              }
            }
          }
          hiddFrame.src = PDF.output('bloburl')
          document.body.appendChild(hiddFrame)
          resolve()
        })
        .catch(error => reject(error))
    })
  },

  async getJsPDF(element, scale = 4) {
    return new Promise((resolve, reject) => {
      let paras = document.body.getElementsByClassName('auto-print-frame')
      for (let i = 0; i < paras.length; i++) {
        //删除元素 元素.parentNode.removeChild(元素);
        if (paras[i] != null) paras[i].parentNode.removeChild(paras[i])
      }
      html2Canvas(element, {
        allowTaint: true,
        scale: scale,
        logging: true,
        imageTimeout: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      })
        .then(canvas => {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          console.log(canvas.width, canvas.height)
          let pageHeight = (contentWidth / pdfWidth) * pdfHeight
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = pdfWidth
          let imgHeight = (pdfWidth / contentWidth) * contentHeight

          let pageData = canvas.toDataURL('image/jpeg', 1)

          let PDF = new JsPDF('', 'pt', 'a4')
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= pdfHeight
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }

          resolve(PDF)
        })
        .catch(error => reject(error))
    })
  },
  autoPrint({ element, scale = 4 }) {
    return new Promise((resolve, reject) => {
      this.getJsPDF(element, scale)
        .then(PDF => {
          PDF.autoPrint()
          let hiddFrame = document.createElement('iframe')
          hiddFrame.className = 'auto-print-frame'
          hiddFrame.style.position = 'fixed'
          hiddFrame.style.width = '1px'
          hiddFrame.style.height = '1px'
          hiddFrame.style.opacity = '0.01'
          const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
          if (isSafari) {
            // fallback in safari
            hiddFrame.onload = () => {
              try {
                hiddFrame.contentWindow.document.execCommand('print', false, null)
              } catch (e) {
                hiddFrame.contentWindow.print()
              }
            }
          }
          hiddFrame.src = PDF.output('bloburl')
          document.body.appendChild(hiddFrame)
          resolve()
        })
        .catch(error => reject(error))
    })
  },
  exportPdf({ element, fileName = 'none.pdf', scale = 4 }) {
    return new Promise((resolve, reject) => {
      this.getJsPDF(element, scale)
        .then(async PDF => {
          await PDF.save(`${fileName}`, {
            returnPromise: true
          })
          resolve()
        })
        .catch(error => reject(error))
    })
  }
}
