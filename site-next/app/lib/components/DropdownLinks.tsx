import Link from 'next/link'

import { FC, useState } from 'react'

import { MappedLinkType } from '../types/site.type'
import Button from './Button'
import useStore from '../hooks/useStore'


export type DropdownLinksProps = {
  links: MappedLinkType[]
  className?: string
}


const DropdownLinks: FC<DropdownLinksProps> = ({
  links,
  className
}) => {
  const [hovered, setHovered] = useState(false)
  const { setShowExtendedFilter } = useStore()
  const { setMobileHeaderOpened } = useStore()
  
  const closeMobileHeader = () => {
    setShowExtendedFilter(false)
    setMobileHeaderOpened(false)
  }

  const mappedLinks = links.map(link =>
    <Link
      key={link.href}
      href={link.href}
      onClick={() => {
        setHovered(false)
        closeMobileHeader()
      }}
    >
      <Button className='text-nowrap my-1'>
        {link.label}
      </Button>
    </Link>
  )
  const [firstLink, ...otherLinks] = mappedLinks

  return (
    <>
      <div
        className={`position-relative d-none d-md-block ${className}`}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        {firstLink}
        <div
          className='position-absolute d-flex flex-column'
          style={{
            top: 0,
            left: 0,
          }}
        >
          {firstLink}
          {hovered &&
            <div className='DropdownLinks__area'>
              {otherLinks}
            </div>
          }
        </div>
      </div>
      <div className='d-flex flex-column d-md-none mb-3'>
        {mappedLinks}
      </div>
    </>
  )
}


export default DropdownLinks
