import { ConnectDB } from "@/lib/config/db";
import Blog_Model from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";

// Helper function to create a unified response
const createResponse = (data, status = 200) => NextResponse.json(data, { status });

// API Endpoint to get all blogs or a specific blog by ID
export async function GET(request) {
    try {
        await ConnectDB();

        const blogId = request.nextUrl.searchParams.get("id");
        const response = blogId 
            ? await Blog_Model.findById(blogId)
            : await Blog_Model.find({});

        return createResponse(blogId ? response : { blogs: response });
    } catch (error) {
        console.error("Error in GET API:", error);
        return createResponse({ success: false, msg: "Internal Server Error" }, 500);
    }
}

// API Endpoint to create a new blog post
export async function POST(request) {
    try {
        await ConnectDB(); 

        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get("image");
        if (!image) {
            return createResponse({ success: false, msg: "Image is required" }, 400);
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const imagePath = `./public/${timestamp}_${image.name}`;

        await writeFile(imagePath, buffer);

        const blogData = {
            title: formData.get("title") || "Untitled",
            description: formData.get("description") || "No description provided",
            category: formData.get("category") || "Uncategorized",
            author: formData.get("author") || "Anonymous",
            image: `/${timestamp}_${image.name}`,
            authorImg: formData.get("authorImg") || "/default-author.png",
        };

        await Blog_Model.create(blogData);
        console.log("Blog saved successfully");

        return createResponse({ success: true, msg: "Blog added successfully" });
    } catch (error) {
        console.error("Error in POST API:", error);
        return createResponse({ success: false, msg: "Internal Server Error" }, 500);
    }
}

// API Endpoint to delete a blog post by ID
export async function DELETE(request) {
    try {
        await ConnectDB();

        const blogId = request.nextUrl.searchParams.get("id");
        if (!blogId) {
            return createResponse({ msg: "Blog ID is required" }, 400);
        }

        const blog = await Blog_Model.findById(blogId);
        if (!blog) {
            return createResponse({ msg: "Blog not found" }, 404);
        }

        const imagePath = `./public${blog.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) console.error("Error deleting the image file:", err);
        });

        await Blog_Model.findByIdAndDelete(blogId);
        return createResponse({ msg: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE API:", error);
        return createResponse({ msg: "Failed to delete the blog", error: error.message }, 500);
    }
}
