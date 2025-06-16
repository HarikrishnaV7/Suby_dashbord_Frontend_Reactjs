import React from 'react'

const Navbar = ({loginhandler,registerhandler,logout,logouthandler}) => {
  const firmName=localStorage.getItem('firmName')
  return (
    <div className='navsection'>
      <div className="company">
        Vendor Dashboard
      </div>
      <div className="firmname">
        <h4>{firmName}</h4>
      </div>
      <div className="userAuth">
        {!logout ?<>
        <span onClick={loginhandler}>Login / </span>
        <span onClick={registerhandler}>Register</span>
        </>:
        <span onClick={logouthandler}>Logout</span>}
      </div>

      </div>
  )
}

export default Navbar