import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './PAGES/Home'
import Default from './PAGES/Default'
import Hospital from './PAGES/Hospital'
import Donor from './PAGES/Donor'
import Recipient from './PAGES/Reciptient'
import DonorRegister from './PAGES/DonorRegister'
import RecipientRegister from './PAGES/ReciptientRegister'
import Transplant from './PAGES/Transplant'

const App = () => {
  const [user, setUser] = useState('undefined')
  const [contract, setContract] = useState("0x1de7f095fc1CfaE080bE4aD20506F8f61F8D411a")
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home setUser={setUser} contract = {contract} />}/>
        <Route path='/default' element = {<Default/>}/>
        <Route path='/hospital' element = {<Hospital/>}/>
        <Route path='/donor' element = {<Donor/>}/>
        <Route path='/reciptient' element = {<Recipient/>}/>
        <Route path='/donor-register' element = {<DonorRegister/>}/>
        <Route path='/recipient-register' element = {<RecipientRegister/>}/>
        <Route path='/transplant' element = {<Transplant/>}/>
      </Routes>
    </Router>
  )
}

export default App