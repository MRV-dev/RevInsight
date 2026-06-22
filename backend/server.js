require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/user');
const mechanicRoutes = require('./routes/mechanic');
const adminRoutes = require('./routes/adminRoutes/admin');
const productRoutes = require('./routes/adminRoutes/product');
const dashboardRoutes = require('./routes/adminRoutes/dashboard');

const cartRoutes = require('./routes/orderingRoutes/cart');
const orderRoutes = require('./routes/orderingRoutes/order');
const serviceRequestRoutes = require('./routes/serviceRequest');


const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});