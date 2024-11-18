import { FC } from 'react'


export type AddNewLinesProps = {
  string: string
}


const AddNewLines: FC<AddNewLinesProps> = ({
  string
}) => {
  return string.split('\n').map(line => (
    <>
      {line}<br />
    </>
  ))
}


export default AddNewLines
