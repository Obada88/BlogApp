import React from 'react'

function SubTableItems({email,mongoId,date , deleteEmails}) {

    const emailDate =  new Date(date);

  return (
    <tr className='bg-white border border-b text-left'>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
            {email?email:'No Email'}
        </th>
        <td className='px-6 py-4'>
            {emailDate.toDateString()}
        </td>
        <td onClick={()=>deleteEmails(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>
    </tr>
  )
}

export default SubTableItems