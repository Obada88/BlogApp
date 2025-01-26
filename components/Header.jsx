import { assets } from '@/Assets/assets'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { fromJSON } from 'postcss';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Header() {

  const [email ,setEmail] = useState("");

  const onSubmitHandler = async (e) => {

      e.preventDefault();
      const formData = new FormData();
      formData.append('email',email);
      

      const response = await axios.post('/api/email',formData);

      if(response.data.success) {
        toast.success(response.data.msg);
        setEmail("")
      }else{
        toast.error("Error")
      }
  } 
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28 '>
        <div className='flex justify-between items-center '>
          <Link  href={'/'}>
          <div>
          <Image
            src={assets.logo}
            alt='Iamge_Logo'
            width={80}
            className='w-[110px] sm:w-auto '
            />
          </div>
          </Link>
            <button className=' flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000]'>
            Get Started <Image src={assets.arrow} alt='image'/>
            </button>

        </div>
  
        <div className='text-center my-8 '>
            <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
            <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero libero alias aliquid molestias suscipit corporis.
            </p>

         <div>
         <form onSubmit={onSubmitHandler} className=' flex justify-between items-center max-w-full md:max-w-[700px] scale-75 sm:scale-100 max-auto mt-10 border border-black  shadow-[-4px_4px_0px_#000]'>
              <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" placeholder='Enter your email ' className='pl-4 outline-none  ' required/>
              <button type='submit' className=' border boredr-1 border-black py-4 px-4 sm:px-8 active:bg-gray-500 active:text-white'>
              Subscribe
              </button>
            </form>
           
         </div>
        </div>
    </div>
  )
}

export default Header