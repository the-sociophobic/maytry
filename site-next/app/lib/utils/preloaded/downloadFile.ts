const downloadFile = (data: Uint8Array | string, fileName: string, type: string) => {
  const a = document.createElement('a')
  const fileURL = createFileURL(data, type)
  const fileNameWithType = fileName + '.' + type

  a.href = fileURL
  a.download = fileNameWithType
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    deleteFileURL(fileURL)
  }, 0)
}


export default downloadFile


export const createFileURL = (data: Uint8Array | string, type: string) => {
  const file = new Blob([data], { type })
  const fileUrl = URL.createObjectURL(file)

  return fileUrl
}


export const deleteFileURL = (fileUrl: string) => {
  window.URL.revokeObjectURL(fileUrl)
}
