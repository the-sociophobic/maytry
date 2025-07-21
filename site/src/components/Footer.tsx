import { FC } from 'react'
import useContentful from '../hooks/useContentful'
import LinkWrapper from './LinkWrapper'
import Button from './Button'

export type FooterProps = {}

const Footer: FC<FooterProps> = () => {
  const { data: contentful } = useContentful()
  const site = contentful?.sites[0]

  return (
    <div className="Footer">
      <div className="container-2">
        <div className="d-flex flex-wrap justify-content-between align-items-start py-5 gap-4 position-relative">

          {/* Column 1 — Соцсети */}
          <div className="d-flex flex-column">
            <LinkWrapper to="https://instagram.com" className="mb-2">
              <Button className="p-0">Instagram</Button>
            </LinkWrapper>
            <LinkWrapper to="https://vk.com">
              <Button className="p-0">VK</Button>
            </LinkWrapper>
          </div>

          {/* Column 2 — Вопросы / Уход */}
          <div className="d-flex flex-column">
            <LinkWrapper to="/faq" className="mb-2">
              <Button className="p-0">Часто задаваемые вопросы</Button>
            </LinkWrapper>
            <LinkWrapper to="/uhod">
              <Button className="p-0">Уход</Button>
            </LinkWrapper>
          </div>

          {/* Column 3 — Контакты */}
          <div className="d-flex flex-column">
            <LinkWrapper to="/contacts" className="mb-2">
              <Button className="p-0">Контактная информация</Button>
            </LinkWrapper>
          </div>

          {/* Column 4 — Политики */}
          <div className="d-flex flex-column">
            <LinkWrapper to="/privacy-policy" className="mb-2">
              <Button className="p-0">Политика конфиденциальности</Button>
            </LinkWrapper>
            <LinkWrapper to="/terms">
              <Button className="p-0">Пользовательское соглашение</Button>
            </LinkWrapper>
          </div>

          {/* Footer bottom right — под колонками */}
          <div className="w-100 d-flex justify-content-end mt-4">
            <div className="text-nowrap small text-secondary">
            2025 Сайт – <LinkWrapper to='https://Леф.рф' className='text-black'>
              <Button className='p-0 d-inline'>
                Леф.рф
              </Button>
            </LinkWrapper>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer