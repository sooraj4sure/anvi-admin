import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src={assets.logo} className='w-20' alt="" />
        <button onClick={()=>setToken('')} className='bg-red-600 hover:bg-red-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-md text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar