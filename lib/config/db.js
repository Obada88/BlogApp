import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://abuzakeriobada501:kqD4EA1SRrXg21Rx@cluster0.iukw1.mongodb.net/blog-app');

    console.log("DB Connect ")
}

