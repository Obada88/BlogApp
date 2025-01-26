import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

function BlogTableItem({athoutImg,title,author,date,deleteBlog,mongoId}) {
    const BlogDate = new Date(date);

  return (
    <tr className=' bg-white border border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900'>
            <Image src={athoutImg?athoutImg:assets.profile_icon} width={40} alt=''/>
            <p>{author?author:'No author'}</p>
        </th>

        <td className='px-3 py-2'>
            {title?title:'no title'}
        </td>
        <td className='px-6 py-4'>
          {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
          x
        </td>
      
    </tr>
  )
}

export default BlogTableItem