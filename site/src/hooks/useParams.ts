import { useLocation } from 'react-router'


const useParams = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)

  return Object.fromEntries(params)
}


export default useParams