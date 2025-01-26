'use client';
import { assets } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

function BlogPage({ params }) {
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    return (
        data ? (
            <>
                <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen py-5 px-5 md:px-12 lg:px-28">
                    {/* Header */}
                    <div className="flex justify-between items-center w-full max-w-4xl">
                        <Image
                            src={assets.logo}
                            alt="Logo"
                            width={180}
                            className="w-[130px] sm:w-auto"
                        />
                        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]">
                            Get Started <Image src={assets.arrow} width={12} alt="Arrow" className="ml-3" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="text-center my-12 w-full max-w-4xl">
                        <h1 className="text-2xl sm:text-3xl font-semibold">
                            {data?.title || "No Title Available"}
                        </h1>
                        <Image
                            className="mx-auto mt-6 border border-white rounded-full"
                            src={data?.authorImg || "/default-author.png"}
                            alt="Author"
                            width={60}
                            height={60}
                        />
                        <p className="mt-1 pb-2 text-lg">{data?.author || "Unknown Author"}</p>
                    </div>

                    {/* Blog Body */}
                    <div className="mx-5 max-w-[800px] w-full text-center">
                        <Image
                            className="border-4 border-white mx-auto"
                            src={data?.image || "/default-image.png"}
                            alt="Blog Image"
                            width={400}
                            height={720}
                        />
                        <h1 className="my-8 text-[26px] font-semibold text-start">Introduction:</h1>
                        <p className="text-left">{data?.description || "No description available."}</p>
                        <div className="mt-10">
                            <p className="text-black text-start font-semibold my-4">Follow us on these pages for more</p>
                            <div className="flex justify-start gap-4">
                                <Image className="cursor-pointer" src={assets.facebook_icon} alt="Facebook" width={50} />
                                <Image className="cursor-pointer" src={assets.twitter_icon} alt="Twitter" width={50} />
                                <Image className="cursor-pointer" src={assets.googleplus_icon} alt="Google Plus" width={50} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </>
        ) : (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-center text-lg">Loading...</p>
            </div>
        )
    );
}

export default BlogPage;
