import { useLocation } from 'react-router-dom'


const useParams = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)

  return Object.fromEntries(params)
}


export default useParams