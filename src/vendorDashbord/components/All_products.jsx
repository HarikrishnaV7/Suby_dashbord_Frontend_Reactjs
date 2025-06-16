import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/apiPath';

const All_products = () => {
  const [products, setproducts] = useState([]);

  const producthandler = async () => {
    const firmId = localStorage.getItem('firmId');
    if (!firmId) {
      alert("No firm selected. Please add or select a firm first.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}product/${firmId}/products`);
      const newproductsdata = await response.json();
      if (newproductsdata && newproductsdata.products) {
        setproducts(newproductsdata.products);
      } else {
        setproducts([]);
        alert("No products found or invalid response.");
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    producthandler();
  }, []);

  const deleteproductbyid = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        const response = await fetch(`${API_URL}product/${productId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setproducts(products.filter(product => product._id !== productId));
          alert("Product deleted successfully");
        }
      }
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete");
    }
  };

  // Inline CSS Styles
  const containerStyle = {
    margin: '40px auto',
    width: '80%',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    paddingBottom: '30px'
  };

  const titleStyle = {
    textAlign: 'center',
    padding: '20px 0',
    color: '#333',
    fontSize: '24px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const theadStyle = {
    backgroundColor: '#007acc',
    color: 'white'
  };

  const cellStyle = {
    padding: '12px 16px',
    textAlign: 'center',
    borderBottom: '1px solid #e0e0e0'
  };

  const imageStyle = {
    width: '80px',
    height: 'auto',
    borderRadius: '4px',
    objectFit: 'cover'
  };

  const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const noProductStyle = {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '40px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>All Products</h2>

      {products.length === 0 ? (
        <p style={noProductStyle}>No products found</p>
      ) : (
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={cellStyle}>Product Name</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Image</th>
              <th style={cellStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td style={cellStyle}>{item.productName}</td>
                <td style={cellStyle}>{item.price}</td>
                <td style={cellStyle}>
                  {item.image && (
                    <img
                      src={`${API_URL}uploads/${item.image}`}
                      alt={item.productName}
                      style={imageStyle}
                    />
                  )}
                </td>
                <td style={cellStyle}>
                  <button
                    onClick={() => deleteproductbyid(item._id)}
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#c0392b')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default All_products;
