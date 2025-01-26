import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

function BlogList() {
    const [meun, setMeun] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blog');
            console.log("Response Data:", response.data); // طباعة استجابة الـ API

            // التحقق من وجود الحقل blogs
            if (response.data && response.data.blogs) {
                setBlogs(response.data.blogs);
            } else {
                console.error("Invalid API response structure");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            {/* أزرار التصنيف */}
            <div className='flex justify-center gap-6 my-10'>
                <button
                    onClick={() => setMeun('All')}
                    className={meun === "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}
                >
                    All
                </button>
                <button
                    onClick={() => setMeun('Technology')}
                    className={meun === "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}
                >
                    Technology
                </button>
                <button
                    onClick={() => setMeun('Startup')}
                    className={meun === "Startup" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}
                >
                    Startup
                </button>
                <button
                    onClick={() => setMeun('Lifestyle')}
                    className={meun === "Lifestyle" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}
                >
                    Lifestyle
                </button>
            </div>

            {/* عرض المقالات */}
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs.length > 0 ? (
                    blogs
                        .filter((item) =>
                            meun === "All" ? true : item.category?.toLowerCase() === meun.toLowerCase()
                        )
                        .map((item, index) => (
                            <BlogItem
                                key={index}
                                id={item._id || "Unknown ID"}
                                image={item.image || "/default-image.png"}
                                title={item.title || "Untitled"}
                                description={item.description || "No description available"}
                                category={item.category || "Uncategorized"}
                            />
                        ))
                ) : (
                    <p>No blogs available at the moment.</p>
                )}
            </div>
        </div>
    );
}

export default BlogList;
