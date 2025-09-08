import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import {connectDB} from '@/utils/db'
import User from '@/models/user'

export async function POST(req) {
    try{
        const body = await req.json();
        const {name,email,password} = body ;

        const hashedPassword = await bcrypt.hash(password,10)
        await connectDB();
        const createdUser = await User.create({
            name,
            email,
            password:hashedPassword,
            provider: "credentials",
        })
        console.log("Created User:", createdUser);

        return NextResponse.json({message:"User registered."},{status:201});
    }
    catch(err){
        console.log(err)
        return NextResponse.json({message:"Error occured in reg"},{status:500})
    }

}