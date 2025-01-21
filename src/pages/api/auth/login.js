import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import { withIronSessionApiRoute } from 'iron-session/next';

const loginRoute = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password'); // Explicitly select password

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Adjust as needed
    });

    req.session.token = token;
    await req.session.save();

    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD, // Ensure you have this in .env.local or Vercel
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Set secure in production
  },
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);