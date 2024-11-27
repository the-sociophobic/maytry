import path from 'path'
import fs from 'fs'


class storage {
  static createFilePath = (fileName: string) => {
    const filePath = path.join(__dirname, '../../storage/' + fileName)

    return filePath
  }

  static read = <T>(fileName: string) => {
    const filePath = this.createFilePath(fileName)
    let data: T | undefined = undefined

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(
        filePath,
        'utf8'
      )
      if (file)
        data = JSON.parse(
          fs.readFileSync(
            filePath,
            'utf8'
          ))
    }

    return data
  }

  static write = (fileName: string, dataToSave: object) => {
    const filePath = this.createFilePath(fileName)

    fs.writeFile(
      filePath,
      JSON.stringify(dataToSave),
      { flag: 'w+' },
      err => err && console.log(err)
    )
  }

  static delete = (fileName: string) => {
    const filePath = this.createFilePath(fileName)

    if (fs.existsSync(filePath))
      fs.unlink(
        filePath,
        err => err && console.log(err)
      )
  }

  static push = <T>(fileName: string, dataToPush: T) => {
    let array = this.read(fileName) as T[] | undefined

    if (array)
      array.push(dataToPush)
    else
      array = [dataToPush]

    this.write(fileName, array)
  }

  static pushArray = <T>(fileName: string, arrayToPush: T[]) => {
    let array = this.read(fileName) as T[] | undefined

    if (array)
      array.push(...arrayToPush)
    else
      array = [...arrayToPush]

    this.write(fileName, array)
  }
}


export default storage
