import { ConnectDB } from "@/lib/config/db";
import Blog_Model from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";


import fs from "fs";


// API Endpoint to get all blogs
export async function GET(request) {
    try {
        await ConnectDB();
        const blogId = request.nextUrl.searchParams.get("id");

        if(blogId) {
            const blog = await Blog_Model.findById(blogId);

            return NextResponse.json(blog)
        } else {
            const blogs = await Blog_Model.find({});
            return NextResponse.json({ blogs }); 
        }

       
    } catch (error) {
        console.error("Error in GET API:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

// API Endpoint for Uploading
export async function POST(request) {
    try {
        await ConnectDB(); 

        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get('image');
        if (!image) {
            return NextResponse.json({ success: false, msg: "Image is required" }, { status: 400 });
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timestamp}_${image.name}`;

        await writeFile(path, buffer);

        const imageUrl = `/${timestamp}_${image.name}`;

        const blogData = {
            title: formData.get('title') || "Untitled",
            description: formData.get('description') || "No description provided",
            category: formData.get('category') || "Uncategorized",
            author: formData.get('author') || "Anonymous",
            image: imageUrl,
            authorImg: formData.get('authorImg') || "/default-author.png",
        };

        await Blog_Model.create(blogData);

        console.log("Blog Saved");

        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Error in POST API:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    
    try {
        const blog = await Blog_Model.findById(id);
        if (!blog) {
            return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
        }

        fs.unlink(`./public${blog.image}`, (err) => {
            if (err) {
                console.error("Error deleting the image file:", err);
            }
        });

        await Blog_Model.findByIdAndDelete(id);

        return NextResponse.json({ msg: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting the blog:", error);
        return NextResponse.json(
            { msg: "Failed to delete the blog", error: error.message },
            { status: 500 }
        );
    }
}
