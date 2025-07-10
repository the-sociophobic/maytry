import getMetadataFromContentful from './lib/utils/getMetadataFromContentful'
import Custom404 from './pages/404'


export async function generateMetadata() {
  return getMetadataFromContentful('/404')
}


export default function NotFound() {
  return (
    <Custom404 />
  )
}
