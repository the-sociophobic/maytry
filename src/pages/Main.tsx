import { FC } from 'react'

import useContentful from '../hooks/useContentful'
import ItemCard from '../components/ItemCard'
import useStore from '../hooks/useStore'
import ItemLine from '../components/ItemLine'


export type MainProps = {}


const Main: FC<MainProps> = ({ }) => {
  const { data: contentful } = useContentful()
  const { searchString } = useStore()
  const { mainPageView } = useStore()

  return (
    <div className=''>
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
  )
}


export default Main
