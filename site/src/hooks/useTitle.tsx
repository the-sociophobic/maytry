import React from 'react'


const useTitle = ( title?: string ) => {
  const res = 'maytry: ' + (title || '')

  React.useEffect(() => {
    document.title = res
  }, [title])

  return res
}


export default useTitle
