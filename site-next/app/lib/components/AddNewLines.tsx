import { FC } from 'react'


export type AddNewLinesProps = {
  string: string
  className?: string
}


const AddNewLines: FC<AddNewLinesProps> = ({
  string,
  className
}) => {
  return string.split('\n').map((line, lineIndex) => (
    <div
      key={lineIndex}
      className={`mb-2 ${className}`}
    >
      {line}<br/>
    </div>
  ))
}


export default AddNewLines
