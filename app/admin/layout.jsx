import { assets } from "@/Assets/assets";
import Sidebar from "@/components/adminComponents/Sidebar";
import Image from "next/image";
import {ToastContainer ,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
export default function Layout({children}) {
    return(
        <>
        <div className=" flex  ">
            <ToastContainer/>
            <Sidebar/>

            <div className=" flex flex-col w-full">
                <div className=" flex items-center justify-between w-full py-5 max-h-[16px] px-12 border-b border-black">
                   
                   <h3 className=" font-medium"> Admin Panel</h3>
                   
                    <Image  src={assets.profile_icon} alt="" width={40}/>
                </div>
                {children}
            </div>
            </div>
        </>
    )
}