'use client'

import { assets } from "@/Assets/assets"
import axios from "axios";
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify";

function AddProduct() {

    const [image , setImage] = useState(false);

    const [data ,setData] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"Alex Bennett",
        authorImg:"/author_img.png"
    })


    const onChangeHnadler = (event) => {
        
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value})) ;

        console.log(data)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

       

            const respone = await axios.post('/api/blog',formData);
           
            if(respone.data.success) {

                toast.success(respone.data.msg)
            } else{
                toast.error('Error')
            }
             

                    setImage(false);
                    setData({
                        title:"",
                        description:"",
                        category:"Startup",
                        author:"Alex Bennett",
                        authorImg:"/author_img.png"
                    })
           

          

    }

  return (
    <>
    <form onSubmit={onSubmitHandler} className=" pt-5 px-5 sm:pt-12 sm:pl-16">

        <p className=" text-xl">Upload thumnail</p>

        <label htmlFor="image">
            <Image className="mt-4" src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" width={140} height={70}/>
        </label>

        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>

            <p className=" text-xl mt-4 ">
                Blog title
            </p>

            <input name="title" onChange={onChangeHnadler} value={data.title} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="Type here" required />
            <p className=" text-xl mt-4 ">
                Blog Descriptions
            </p>

            <textarea name="description" onChange={onChangeHnadler} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="wretie content here" rows={6} required />

            <p className="text-xl mt-4 "> Blog Category</p>
            
            <select name="category" onChange={onChangeHnadler} value={data.category} className=" w-40 px-4 py-3 boredr text-gray-500" >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
                <br />
            <button type="submit" className=" mt-8 w-40 h-12 bg-black text-white rounded-sm">
                Add Blog
            </button>
    </form>
    </>
  )
}

export default AddProduct