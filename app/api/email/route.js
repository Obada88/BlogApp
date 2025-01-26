import { ConnectDB } from "@/lib/config/db";
import EmailModle from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB()
}
export async function POST(request) {

    const formData = await request.formData();

    const emailData = {
        email: `${formData.get('email')}`,

    }

    await EmailModle.create(emailData);

    return NextResponse.json({success:true,msg:"Email Subscribed"})

    
}


export async function GET (request) {
    const emails = await EmailModle.find({});

    return NextResponse.json({emails})
}


export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, msg: "Missing ID in request" },
                { status: 400 } // خطأ في الطلب
            );
        }

        const deletedItem = await EmailModle.findByIdAndDelete(id);

        if (!deletedItem) {
            return NextResponse.json(
                { success: false, msg: "Item not found" },
                { status: 404 } // لم يتم العثور على العنصر
            );
        }


        return NextResponse.json({ success: true, msg: "Email Deleted" });
    } catch (error) {
        console.error("Error during DELETE operation:", error);
        return NextResponse.json(
            { success: false, msg: "Internal Server Error" },
            { status: 500 } // خطأ داخلي
        );
    }
}
