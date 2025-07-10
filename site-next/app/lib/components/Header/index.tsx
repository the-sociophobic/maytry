import HeaderBody from './HeaderBody'


const Header = () => {
  return (
    <>
      <div className={`Header Header--relative`}>
        <HeaderBody />      
      </div>
      <div className={`Header Header--fixed`}>
        <HeaderBody />      
      </div>
    </>
  )
}


export default Header
