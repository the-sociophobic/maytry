import Link from 'next/link'

import DropdownLinks from '../DropdownLinks'
import Button from '../Button'
import useStore from '../../hooks/useStore'


const HeaderControls = () => {
  const { setShowExtendedFilter } = useStore()
  const { setMobileHeaderOpened } = useStore()

  const closeMobileHeader = () => {
    setShowExtendedFilter(false)
    setMobileHeaderOpened(false)
  }

  return (
    <div className='d-flex flex-column align-items-start mb-4'>
      <DropdownLinks links={[
        {
          href: '/',
          label: 'КАТАЛОГ'
        },
        {
          href: '/categoriya/futbolki',
          label: 'ФУТБОЛКИ'
        },
        {
          href: '/categoriya/hudi',
          label: 'ХУДИ'
        },
        {
          href: '/categoriya/bryuki',
          label: 'БРЮКИ'
        },
        {
          href: '/categoriya/kurtki',
          label: 'КУРТКИ'
        },
      ]} />
      <DropdownLinks links={[
        {
          href: '/faq',
          label: 'ВОПРОС-ОТВЕТ'
        },
        {
          href: '/faq/delivery-and-pay',
          label: 'ДОСТАВКА И ОПЛАТА'
        },
        {
          href: '/faq/returns',
          label: 'ПРАВИЛА ВОЗВРАТА'
        },
        {
          href: '/faq/sizes',
          label: 'РАЗМЕРЫ'
        },
        {
          href: '/faq/care',
          label: 'УХОД'
        },
      ]} />
      <Link
        href={'/contacts'}
        onClick={closeMobileHeader}
      >
        <Button>
          КОНТАКТЫ
        </Button>
      </Link>
    </div>
  )
}


export default HeaderControls
