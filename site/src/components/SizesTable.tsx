import { FC } from 'react'

import { SizesTableType } from '../types/contentful.type'


export type SizesTableProps = {
  sizes?: SizesTableType
}


const SizesTable: FC<SizesTableProps> = ({
  sizes
}) => {
  if (!sizes)
    return <></>
    
  const rows: string[][] = []
  const columns: string[][] = []

  Object.entries(sizes).map(([key, value]) =>
    rows.push([key, ...value])
  )
  for (let i = 0; i < rows[0].length; i++) {
    columns.push(rows.map(row => row[i]))
  }

  return (
    <div className='row mt-5 mb-2'>
      {columns.map((column, columnIndex) =>
        <div
          key={columnIndex}
          className='col font-small'
        >
          {column.map(item =>
            <div className={`text-nowrap ${columnIndex !== 0 && 'text-center'}`}>
              {item}
            </div>
          )}
        </div>        
      )}
    </div>
  )
}


export default SizesTable
