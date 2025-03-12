import { FC, useEffect } from 'react'

import { useNavigate } from 'react-router'


export type RedirectProps = {
  to: string
}


const Redirect: FC<RedirectProps> = ({
  to
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to)
  }, [])

  return <div>Redirect page</div>
}


export default Redirect
