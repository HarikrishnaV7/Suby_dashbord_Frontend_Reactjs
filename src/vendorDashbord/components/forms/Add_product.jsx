import React, { useState } from 'react';

const Add_product = () => {
  const formStyle = {
    width: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxSizing: 'border-box',
    marginLeft:'400px'
  };

  const inputStyle = {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '0.9rem'
  };

  const fileInputStyle = {
    fontSize: '0.9rem',
    border: 'none',
    padding: '4px',
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007acc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '0'
  };

  const checkboxGroupStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  };

  const [productname, setproductname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState([]);
  const [bestseller, setBestseller] = useState("no");
  const [image, setimage] = useState(null);
  const [description, setdescription] = useState("");

  const API_URL = "http://localhost:4000/product/";

  const handleaddproduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        console.error("User not authenticated");
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('productName', productname);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestseller', bestseller);

      if (image) {
        formData.append('image', image);
      }

      category.forEach((value) => {
        formData.append('category', value);
      });

      const response = await fetch(`${API_URL}add-product/${firmId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${loginToken}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully");
        setproductname("")
        setprice("")
        setcategory([])
        setBestseller("no")
        setimage(null)
        setdescription("")
      } else {
        console.error(data.message);
        alert("Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the product.");
    }
  };

  const handleimageupload = (e) => {
    const selectedImage = e.target.files[0];
    setimage(selectedImage);
  };

  const handlecategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((item) => item !== value));
    } else {
      setcategory([...category, value]);
    }
  };

  const handlebestseller = (e) => {
    setBestseller(e.target.value);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      paddingTop: '40px'
    }}>
      <form style={formStyle} onSubmit={handleaddproduct}>
        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Add Product</h3>

        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productname}
          onChange={(e) => setproductname(e.target.value)}
          style={inputStyle}
        />

        <label>Price</label>
        <input
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          style={inputStyle}
        />

        <label>Category</label>
        <div style={checkboxGroupStyle}>
          <label>
            <input
              type="checkbox"
              name="category"
              value="veg"
              checked={category.includes("veg")}
              onChange={handlecategory}
            /> Veg
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="non-veg"
              checked={category.includes("non-veg")}
              onChange={handlecategory}
            /> Non-Veg
          </label>
        </div>

        <label>Best Seller</label>
        <div style={checkboxGroupStyle}>
          <label>
            <input
              type="radio"
              name="bestseller"
              value="yes"
              checked={bestseller === "yes"}
              onChange={handlebestseller}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name="bestseller"
              value="no"
              checked={bestseller === "no"}
              onChange={handlebestseller}
            /> No
          </label>
        </div>

        <label>Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          style={inputStyle}
        />

        <label>Product Image</label>
        <input
          type="file"
          onChange={handleimageupload}
          style={fileInputStyle}
        />

        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default Add_product;
