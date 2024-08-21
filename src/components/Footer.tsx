import { FC } from 'react'
import useContentful from '../hooks/useContentful'
import LinkWrapper from './LinkWrapper'
import Button from './Button'


export type FooterProps = {}


const Footer: FC<FooterProps> = ({ }) => {
  const { data: contentful } = useContentful()
  const site = contentful?.sites[0]

  return (
    <div className='Footer'>
      <div className='container-2'>
        <div className='row'>
          <div className='col pt-2 pb-4'>
            {site?.footer_links?.map(link =>
              <LinkWrapper
                key={link.link}
                to={link.link}
              >
                <Button>
                  {link.title}
                </Button>
              </LinkWrapper>
            )}
          </div>
          <div className='col'>
            © 2024 by @the_sociophobic
          </div>
        </div>
      </div>
    </div>
  )
}


export default Footer
