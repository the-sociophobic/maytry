import path from 'path'
import fs from 'fs'


class storage {
  static createFilePath = (fileName: string) => {
    const filePath = path.join(__dirname, '../../storage/' + fileName)
  
    return filePath
  }

  static read = <T>(fileName: string): T => {
    const filePath = this.createFilePath(fileName)
    let file: object | any[] | undefined = undefined
  
    if (fs.existsSync(filePath))
      file = JSON.parse(
        fs.readFileSync(
          filePath,
          'utf8'
        ))
  
    return file as T
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

  static delete = (fileName: string) => {
    const filePath = this.createFilePath(fileName)

    if (fs.existsSync(filePath))
      fs.unlink(
        filePath,
        err => console.log(err)
      )
  }

  static push = (fileName: string, dataToPush: object) => {
    let array = this.read(fileName) as any[] | undefined

    if (array)
      array.push(dataToPush)
    else
      array = [dataToPush]

    this.write(fileName, array)
  }
}


export default storage
