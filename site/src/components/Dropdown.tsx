import { FC, ReactNode, useEffect, useRef, useState } from 'react'


export type DropdownProps = {
  header: string
  children: ReactNode
}


const Dropdown: FC<DropdownProps> = ({
  header,
  children
}) => {
  const [opened, setOpened] = useState(false)
  const [height, setHeight] = useState(0)
  const bodyWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!opened || !bodyWrapperRef.current) {
      setHeight(0)
      return
    }

    const bodyWrapperHeight = bodyWrapperRef.current.getBoundingClientRect().height
    setHeight(bodyWrapperHeight)
  }, [opened, bodyWrapperRef, setHeight])

  return (
    <div className={`Dropdown ${opened && 'Dropdown--opened'}`}>
      <div
        className='Dropdown__header'
        onClick={() => setOpened(!opened)}
      >
        {header}
      </div>
      <div
        className='Dropdown__body'
        style={{ height }}
      >
        <div
          ref={bodyWrapperRef}
          className='Dropdown__body__wrapper'
        >
          {children}
        </div>
      </div>
    </div>
  )
}


export default Dropdown
