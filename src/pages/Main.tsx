import { FC } from 'react'

import useContentful from '../hooks/useContentful'
import ItemCard from '../components/ItemCard'
import useStore from '../hooks/useStore'
import ItemLine from '../components/ItemLine'
import { FiberScene } from '../components/Fiber/FiberScene'


export type MainProps = {}


const Main: FC<MainProps> = ({ }) => {
  const { data: contentful } = useContentful()
  const { searchString } = useStore()
  const { mainPageView } = useStore()

  return (
    <>
      <FiberScene />
      <div className='container'>
        <div className={`
      d-flex
      flex-${mainPageView === 'IMG' ? 'row' : 'column'}
      flex-wrap
      justify-content-between
    `}>
          {contentful?.items
            .filter(item =>
              searchString.length === 0
              || item.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
            )
            .map(item =>
              mainPageView === 'IMG' ?
                <ItemCard {...item} />
                :
                <ItemLine {...item} />
            )
          }
        </div>
      </div>
    </>
  )
}


export default Main
