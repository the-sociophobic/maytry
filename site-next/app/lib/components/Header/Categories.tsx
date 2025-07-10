import Link from 'next/link'

import { FC } from 'react'

import useContentful from '../../hooks/useContentful'
import useStore from '../../hooks/useStore'
import Button from '../Button'
import Input from '../Input'


const Categories: FC = () => {
  const { data: contentful } = useContentful()
  const { filterBy } = useStore()
  const { setFilterBy } = useStore()
  const { searchString } = useStore()
  const { setSearchString } = useStore()
  const { showExtendedFilter } = useStore()
  const { setShowExtendedFilter } = useStore()
  const extended_filter_categories = contentful?.categorys
    .filter(category => category.link && !category.link.includes('=')) || []

  return (
    <div className={`d-flex flex-column flex-md-row`}>
      <div className={`d-flex flex-column mx-md-auto flex-md-row no-padding-md`}>
        <div className={`d-flex flex-row align-items-center flex-wrap`}>
          {extended_filter_categories.map((category, index) => {
            const isActive = !!category.link && filterBy.includes(category.link)
            const href = isActive && false ?
              `/`
              :
              `/categoriya/${category.link || ''}`

            return (
              <Link
                key={index}
                href={href}
              >
                <Button
                  hoverable
                  gray={isActive}
                  className='me-2 mb-2'
                  onClick={() => {
                    setFilterBy(isActive && false ?
                      []
                      :
                      (category.link ? [category.link] : [])
                    )
                  }}
                >
                  {category.name}
                </Button>
              </Link>
            )
          })}
        </div>
        <Button onClick={() => {
          setShowExtendedFilter(!showExtendedFilter)
          // setFilterBy([])
        }}>
          ФИЛЬТР {showExtendedFilter ? '↑' : '↓'}
        </Button>
      </div>
      <Input
        className='Header__section mt-2 mt-md-0'
        value={searchString}
        onChange={setSearchString}
        placeholder='ПОИСК'
      />
    </div>
  )
}


export default Categories
