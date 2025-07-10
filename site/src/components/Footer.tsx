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
        <div className='row py-5'>
          <div className='col-sm-10 col-md-5 pt-2 pb-4'>
            {site?.footer_links?.map(link =>
              <LinkWrapper
                key={link.link}
                to={link.link}
                className={link.new_line ? 'd-block mb-4' : ''}
              >
                <Button className='p-0'>
                  {link.title}
                </Button>
              </LinkWrapper>
            )}
          </div>
          <div className='col-sm-10 col-md-5'>
            2025 Сайт – <LinkWrapper to='https://Леф.рф' className='text-black'>
              <Button className='p-0 d-inline'>
                Леф.рф
              </Button>
            </LinkWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Footer
