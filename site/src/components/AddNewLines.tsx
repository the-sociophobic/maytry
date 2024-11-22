import { FC } from 'react'


export type AddNewLinesProps = {
  string: string
}


const AddNewLines: FC<AddNewLinesProps> = ({
  string
}) => {
  return string.split('\n').map((line, lineIndex) => (
    <div key={lineIndex}>
      {line}<br />
    </div>
  ))
}


export default AddNewLines
