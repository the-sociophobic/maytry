import path from 'path'
import fs from 'fs'

import delay from './delay'
import isObject from './isObject'


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

  static write = async (fileName: string, dataToSave: object) => {
    const filePath = this.createFilePath(fileName)

    fs.writeFile(
      filePath,
      JSON.stringify(dataToSave),
      { flag: 'w+' },
      err => err && console.log(err)
    )
    
    await delay()
  }

  static delete = async (fileName: string) => {
    const filePath = this.createFilePath(fileName)

    if (fs.existsSync(filePath))
      fs.unlink(
        filePath,
        err => err && console.log(err)
      )

    await delay()
  }

  static push = async <T>(fileName: string, dataToPush: T) => {
    let array = this.read(fileName) as T[] | undefined

    if (array)
      array.push(dataToPush)
    else
      array = [dataToPush]

    this.write(fileName, array)

    await delay()
  }

  static pushArray = async <T>(fileName: string, arrayToPush: T[]) => {
    let array = this.read(fileName) as T[] | undefined

    if (array)
      array.push(...arrayToPush)
    else
      array = [...arrayToPush]

    this.write(fileName, array)

    await delay()
  }


  static get = async <T extends ItemInStorageType>(
    fileName: string,
    itemProps: { [key: string]: string | number }
  ) => {
    let array = this.read(fileName) as T[] | undefined
    const itemInArray = array
      ?.find(item =>
        Object.keys(itemProps)
        .every(key => isObject(item) && itemProps[key] === item[key])
      )

    return itemInArray
  }
  
  static update = async <T extends ItemInStorageType>(
    fileName: string,
    itemToUpdate: T
  ) => {
    let array = this.read(fileName) as T[] | undefined

    if (!array)
      array = []

    const itemIndex = array
      ?.map(item => item.id)
      ?.indexOf(itemToUpdate.id)

    if (itemIndex)
      array = [
        ...array.slice(0, itemIndex),
        itemToUpdate,
        ...array.slice(itemIndex + 1),
      ]
    else
      array = [...array, itemToUpdate]

    this.write(fileName, array)

    await delay()
  }
}

interface ItemInStorageType {
  id: string
}


export default storage
