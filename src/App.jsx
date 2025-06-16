import React from 'react'
import Landing_page from './vendorDashbord/pages/Landing_page'
import "./App.css"
import{Routes,Route} from 'react-router-dom'
import Notfound from './vendorDashbord/components/Notfound'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element= {<Landing_page/>}/>
        <Route path="/*" element={<Notfound/>}/>
      </Routes>
        
    </div>
  )
}

export default App