// pages/api/auth/login.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import { withIronSessionApiRoute } from 'iron-session';

const loginRoute = async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Method Not Allowed:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();
  console.log('Database Connected');

  const { email, password } = req.body;
  console.log('Received Data:', { email, password });

  try {
    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user);


    if (!user || !(await user.comparePassword(password))) {
        console.log('Invalid Credentials')
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
     console.log('Token Generated:', token);
    req.session.token = token;
    await req.session.save();

    res.status(200).json({ message: 'Logged in successfully', token });
    console.log('Logged in Successfully');
  } catch (error) {
     console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);