import React from 'react'
import { FaDiscord, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
const Links=[
  {href:"/" , Icon:<FaFacebook/>},
  {href:"/" , Icon:<FaDiscord/>},
  {href:"/" , Icon:<FaTwitter/>},
  {href:"/" , Icon:<FaWhatsapp/>},
]
const Footer = () => {
  return (
    <footer className='w-screen bg-violet-300 
    py-4 text-black'>
      <div className='container mx-auto flex flex-col items-center 
      justify-between gap-4 px-4 md:flex-row'>
        <p className='text-center text-sm md:text-left'>
          @Nova 2024 all rights reserved</p>
          <div className='flex justify-center gap-4 md:justify-start'>
            {Links.map((link,index)=>(
              <a href={link.href} key={index}
               className='text-2xl transation-colors
                hover:text-violet-50 duration-500 ease-in-out'>
                {link.Icon}
              </a>
            ))}
          </div>
          <a href=""
           className='text-center text-sm hover:underline md:text-right'>
              privacy policy


          </a>

        
      </div>
    </footer>
  )
}

export default Footer