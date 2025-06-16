import React,{useState} from 'react';
import { API_URL } from '../../data/apiPath';

const Add_firm = () => {
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  };

  const formStyle = {
    width: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginLeft:'400px',
    marginTop:'-80px'
  };

  const checkboxGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '10px'
  };

  const checkboxItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  };

  const inputStyle = {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '0.9rem'
  };

  const buttonStyle = {
    padding: '8px',
    backgroundColor: '#007acc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const [firmname,setfirmname]=useState("")
  const [area,setarea]=useState("")
  const [category,setcategory]=useState([])
  const [region,setregion]=useState([])
  const [offer,setoffer]=useState("")
  const [file,setfile]=useState(null)

  const handlecategory=(e)=>{
    const value = e.target.value
    if(category.includes(value)){
      setcategory(category.filter((item)=>item !== value))
    }else{
      setcategory([...category,value])
    }
  }

  const handleregion=(e)=>{
    const value = e.target.value
    if(region.includes(value)){
      setregion(region.filter((item)=>item !== value))
    }else{
      setregion([...region,value])
    }
  }

  const handleimageupload=(e)=>{
    const selectedimage=e.target.files[0]
    setfile(selectedimage)
  }

  const handlefirmsubmit=async(e)=>{
    e.preventDefault()
    try {
      const loginToken=localStorage.getItem('loginToken')
      if(!loginToken){
        console.error("user not authenticated")
      }
      const formData=new FormData()
      formData.append('firmName',firmname)
      formData.append('area', area);
      formData.append('offer',offer)
      if (file) {
        formData.append('image', file)
      }
      
      category.forEach((value)=>{
        formData.append('category',value)
      })
      region.forEach((value)=>{
        formData.append('region',value)
      })

      const response= await fetch(`${API_URL}firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body: formData
      })
      const data= await response.json()
      if(response.ok){
        console.log(data)
        setfirmname("")
        setarea("")
        setcategory([])
        setregion([])
        setoffer("")
        setfile(null)
        alert("firm added successfully")
      }
      const mango=data.firmId
      localStorage.setItem('firmId',mango)
    } catch (error) {
      console.error("failed to add firm")
      console.error("❌ Full error object:", error);
      alert("Failed to add firm: " + error.message);
    }
  }

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handlefirmsubmit}>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }} >Add Firm</h3>

        <label>Firm Name</label>
        <input type="text" placeholder="Enter Firm Name" value={firmname} name='firmname' onChange={(e)=>setfirmname(e.target.value)} style={inputStyle} />

        <label>Area</label>
        <input type="text" placeholder="Enter Area Name" value={area} name='area' onChange={(e)=>setarea(e.target.value)} style={inputStyle} />

        <label>Category</label>
        <div style={checkboxGroupStyle}>
          <label style={checkboxItemStyle}>
            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handlecategory} /> Veg
          </label>
          <label style={checkboxItemStyle}>
            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handlecategory}/> Non-Veg
          </label>
        </div>

        <label>Region</label>
        <div style={checkboxGroupStyle}>
          <label style={checkboxItemStyle}>
            <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleregion} /> South Indian
          </label>
          <label style={checkboxItemStyle}>
            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleregion} /> North Indian
          </label>
          <label style={checkboxItemStyle}>
            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleregion} /> Chinese
          </label>
          <label style={checkboxItemStyle}>
            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleregion}/> Bakery
          </label>
        </div>

        <label>Offer</label>
        <input type="text" placeholder="Enter Your Offer" value={offer} name='offer' onChange={(e)=>setoffer(e.target.value)} style={inputStyle} />

        <label>Firm Image</label>
        <input type="file" onChange={handleimageupload} style={inputStyle} />

        <button type='submit' style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default Add_firm;
