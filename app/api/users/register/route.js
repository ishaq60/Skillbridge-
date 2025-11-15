import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/connectDB';
import User from '../../../../lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();
  try {
    const { username, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user', error: error.message }, { status: 500 });
  }
}
