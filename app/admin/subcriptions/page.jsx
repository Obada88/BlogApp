'use client'

import SubTableItems from "@/components/adminComponents/SubTableItems"
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
function Subscrptions() {

    const [emails ,setEmails] = useState([]);

    const fetchEmail = async () => {

        const response = await axios.get('/api/email');

        setEmails(response.data.emails);
    }

    const deleteEmails = async (mongoId) => {
      try {
          const response = await axios.delete(`/api/email`, {
              params: { id: mongoId },
          });
  
          toast.success(response.data.msg);
  
          fetchEmail();
      } catch (error) {
          console.error("Error deleting email:", error);
  
          toast.error(
              error.response?.data?.msg || "Failed to delete the email. Please try again."
          );
      }
  };
  

    useEffect(()=>{
      fetchEmail();
    },[])

  return (
    <div className=" felx-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl font-semibold uppercase">All Subscription</h1>

      <div className=" relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border boredr-gray-400 scrollBar-hide">
        <table className=" w-full text-sm text-gray-500 ">
          <thead className=" text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscrptions
              </th>
              <th scope="col" className=" hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
               Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {
              emails?.map((items, index) => {
                return <SubTableItems key={index} mongoId={items._id} email={items.email} deleteEmails={deleteEmails} date={items.date}/>
              })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Subscrptions