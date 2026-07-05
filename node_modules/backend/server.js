require('dotenv').config();

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const mechanicRoutes = require('./routes/mechanic');
const adminRoutes = require('./routes/adminRoutes/admin');
const productRoutes = require('./routes/adminRoutes/product');
const dashboardRoutes = require('./routes/adminRoutes/dashboard');

const cartRoutes = require('./routes/orderingRoutes/cart');
const orderRoutes = require('./routes/orderingRoutes/order');
const serviceRequestRoutes = require('./routes/serviceRequest');
const mechanicPartsRoutes = require('./routes/mechanicParts');


const mongoose = require('mongoose');
const Admin = require('./models/adminModels/admin');
const app = express();
const path = require('path');

// Middleware
app.use(cors());
// simple request logger for debugging
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.path);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve uploaded files
app.use(express.static('uploads'));

// serve frontend static files from the workspace `frontend` folder
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));


const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/revinsight-ai';
const port = process.env.PORT || 5000;

const ensureAdminUser = async () => {
  const username = process.env.ADMIN_USERNAME || 'Admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (!existingAdmin) {
      await Admin.create({ username, password });
      console.log(`Default admin created: ${username}`);
    } else {
      console.log(`Default admin already exists: ${username}`);
    }
  } catch (err) {
    console.error('Failed to create default admin:', err.message);
  }
};

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('MongoDB connected');
    await ensureAdminUser();
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/mechanic', mechanicPartsRoutes);

// Catch-all for frontend routes (serve admin login for non-API requests)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(frontendPath, 'Admin', 'adminLogin.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});