import useContentful from './useContentful'


const useBlankImage = () => {
  const { data: contentful } = useContentful()
  let image: string | undefined

  for (let item of (contentful?.items || [])) {
    if (item.images[0])
      image = item.images[0].small.file.url
  }

  return image
}


export default useBlankImage
