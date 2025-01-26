import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function BlogItem({ title, description, category, image, id }) {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-4px_4px_0px_#000]'>
      <Link href={`/blogs/${id}`} aria-label={`Read more about ${title || "blog"}`}>
        
          <Image
            src={image || "/default-image.png"}
            alt={title || "Blog image"}
            width={400}
            height={400}
            className="object-cover border border-black"
          />
   
      </Link>

      <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm '>{category || "Uncategorized"}</p>
      <div className='p-5'>
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>
          {title || "No Title Available"}
        </h5>
        <p className='mb-3 text-sm tracking-tight text-gray-700'>
          {description || "No description available."}
        </p>
        <Link
          href={`/blogs/${id}`}
          aria-label={`Read more about ${title || "blog"}`}
          className='inline-flex items-center bg-white py-2 font-semibold text-center'
        >
          Read More <Image src={assets.arrow} alt='Arrow icon' width={12} className='ml-2' />
        </Link>
      </div>
    </div>
  );
}

export default BlogItem;
