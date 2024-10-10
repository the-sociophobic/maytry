import path from 'path'
import fs from 'fs'


class storage {
  static createFilePath = (fileName: string) => {
    const filePath = path.join(__dirname, '../../storage/' + fileName)
  
    return filePath
  }

  static read = (fileName: string) => {
    const filePath = this.createFilePath(fileName)
    let file: object | undefined = undefined
  
    if (fs.existsSync(filePath))
      file = JSON.parse(
        fs.readFileSync(
          filePath,
          'utf8'
        ))
  
    return file
  }
  
  
  static write = (fileName: string, dataToSave: object) => {
    const filePath = this.createFilePath(fileName)
  
    fs.writeFile(
      filePath,
      JSON.stringify(dataToSave),
      { flag: 'w+' },
      err => console.log(err)
    )
  }  
}


export default storage
