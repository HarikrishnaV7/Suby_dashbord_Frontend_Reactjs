import React ,{useState,useEffect}from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Add_firm from '../components/forms/Add_firm'
import Add_product from '../components/forms/Add_product'
import Welcome from '../components/welcome'
import All_products from '../components/All_products'

const Landing_page = () => {
  const [login, setlogin]=useState(false)
  const[register,setregister]=useState(false)
  const[Addfirm,setAddfirm]=useState(false)
  const[Addproduct,setAddproduct]=useState(false)
  const [welcome,setwelcome]=useState(false)
  const[allproducts,setallproducts]=useState(false)
  const[logout,setlogout]=useState(false)
  const[firmtitle,setfirmtitle]=useState(true)

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken')
    if(loginToken){
      setlogout(true)
    }
  },[])
  useEffect(()=>{
    const firmName=localStorage.getItem('firmName')
    if(firmName){
      setfirmtitle(false)
    }
  },[])

  const logouthandler=()=>{
    confirm("are you sure to logout?")
    localStorage.removeItem("loginToken")
    localStorage.removeItem("firmId")
    localStorage.removeItem("firmName")
    setlogout(false)
    setfirmtitle(true)
  }

  const welcomehandler=()=>{
    setwelcome(true)
    setAddproduct(false)
    setAddfirm(false)
    setlogin(false)
    setregister(false)
    setallproducts(false)
  }

  const loginhandler=()=>{
    setlogin(true)
    setregister(false)
    setAddfirm(false)
    setAddproduct(false)
    setwelcome(false)
    setallproducts(false)
  }
  const registerhandler=()=>{
    setregister(true)
    setlogin(false)
    setAddfirm(false)
    setAddproduct(false)
    setwelcome(false)
    setallproducts(false)
  }
  const Addfirmhandler=()=>{
    if(logout){
    setAddfirm(true)
    setlogin(false)
    setregister(false)
    setAddproduct(false)
    setwelcome(false)
    setallproducts(false)
    }else{
      alert("please login")
      setlogin(true)
    }
  }
  const Addproducthandler=()=>{
    if(logout){
    setAddproduct(true)
    setAddfirm(false)
    setlogin(false)
    setregister(false)
    setwelcome(false)
    setallproducts(false)
    }else{
      alert("please login")
      setlogin(true)
    }

  }
   const Allproductshandler=()=>{
    if(logout ){
    setallproducts(true)
    setwelcome(false)
    setAddproduct(false)
    setAddfirm(false)
    setlogin(false)
    setregister(false)
    }else{
      alert("please login")
      setlogin(true)
    }
  }
  return (
  <>
      <section className='LandingSection'>
        <Navbar loginhandler={loginhandler} registerhandler={registerhandler} logout={logout} logouthandler={logouthandler}/>
        <div className="collectionSection">
        <Sidebar Addfirmhandler={Addfirmhandler} Addproducthandler={Addproducthandler} Allproductshandler={Allproductshandler} firmtitle={firmtitle}/>
        {login && <Login welcomehandler={welcomehandler} setlogout={setlogout} registerhandler={registerhandler}/>}
        {register && <Register loginhandler={loginhandler}/>}
        {Addfirm && logout && <Add_firm/>}
        {Addproduct && logout && <Add_product/>}
        {welcome && <Welcome/>}
        {allproducts && logout && <All_products/>}
        </div>
       
      </section>
  </>
  )
}

export default Landing_page