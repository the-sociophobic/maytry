'use server'

import Link from 'next/link'

import { FC } from 'react'

import { getContentfulDataWithoutBadItems } from '../../hooks/useContentful'


export type FooterSSRProps = {}


const FooterSSR: FC<FooterSSRProps> = async ({ }) => {
  const contentful = await getContentfulDataWithoutBadItems()
  const site = contentful?.sites[0]
  // console.log(site?.footer_links)
  return (
    <div className='Footer'>
      <div className='container-2'>
        <div className='row py-5'>
          <div className='col-sm-10 col-md-5 pt-2 pb-4'>
            {site?.footer_links?.map(link =>
              <Link
                key={link.link}
                href={link.link}
                className={link.new_line ? 'd-block mb-4' : ''}
              >
                <div className='p-0'>
                  {link.title}
                </div>
              </Link>
            )}
          </div>
          <div className='col-sm-10 col-md-5'>
            2025 Сайт – <Link href='https://Леф.рф' className='text-black'>
              <div className='p-0 d-inline'>
                Леф.рф
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export { FooterSSR }
