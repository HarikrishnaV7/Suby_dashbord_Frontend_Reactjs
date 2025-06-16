import React from 'react'

const Sidebar = ({Addfirmhandler,Addproducthandler,Allproductshandler,firmtitle}) => {
  return (
    <div>
        <div className="sidebarSection">
            <ul>
              {firmtitle ? <li onClick={Addfirmhandler}>Add Firm</li>:""}
                <li onClick={Addproducthandler}>Add Product</li>
                <li onClick={Allproductshandler}>All Products</li>
                <li>User Details</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar