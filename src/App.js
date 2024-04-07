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
  const [contract, setContract] = useState("0x2B7A2021fe5C11Cd576DCb74EdE823C70AeA984F")
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home setUser={setUser} contract = {contract} />}/>
        <Route path='/default' element = {<Default/>}/>
        <Route path='/hospital' element = {<Hospital contract = {contract}/>}/>
        <Route path='/donor' element = {<Donor contract = {contract}/>}/>
        <Route path='/recipient' element = {<Recipient contract = {contract}/>}/>
        <Route path='/donor-register' element = {<DonorRegister contract = {contract}/>}/>
        <Route path='/recipient-register' element = {<RecipientRegister contract = {contract}/>}/>
        <Route path='/transplant' element = {<Transplant/>}/>
      </Routes>
    </Router>
  )
}

export default App