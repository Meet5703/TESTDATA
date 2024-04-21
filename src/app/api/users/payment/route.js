import User from "@/DB/Model/userModel";
import { NextResponse } from "next/server";
import { dbConnect } from "@/DB/dbconnect";
dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, courses, status, price, coupenCode } = reqBody;
    console.log(reqBody);

    // Find the user
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({ email, courses, status, price, coupenCode });
    } else {
      // Update existing user
      user.price = price;
      user.coupenCode = coupenCode;
      user.courses = courses;
      user.status = status;
    }

    // Save the user
    const savedUser = await user.save();

    return NextResponse.json(
      { message: "User created/updated successfully" },
      { status: 200 },
      savedUser
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
