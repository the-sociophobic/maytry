import { FC } from 'react'


export type SizeSelectorSizeType = {
  id: string
  name: string
  available: boolean
}

export type SizeSelectorProps = {
  sizes: SizeSelectorSizeType[]
  selectedIds: string[]
  onChange: (sizeId: string) => void
  className?: string
}


const SIZES_ORDER = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '46', '48', '50', '52', '146р.'
]


const SizeSelector: FC<SizeSelectorProps> = ({
  sizes,
  selectedIds,
  onChange,
  className
}) => {
  return (
    <div className={`SizeSelector ${className}`}>
      <div className='d-flex flex-row'>
        <div className='me-3'>
          Размер:
        </div>
        {sizes
        .sort((a, b) => SIZES_ORDER.indexOf(a.name) - SIZES_ORDER.indexOf(b.name))
        .map((size, sizeIndex) =>
          <div
            key={sizeIndex}
            className={`
              me-3 cursor-pointer no-select
              ${!size.available && 'text-disabled'}
              ${(selectedIds.includes(size.id) && size.available) && 'text-underline'}
            `}
            onClick={() => size.available && onChange(size.id)}
          >
            {size.name}
          </div>
        )}
      </div>
    </div>
  )
}


export default SizeSelector
