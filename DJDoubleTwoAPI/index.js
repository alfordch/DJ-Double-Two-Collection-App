const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Allowed origin
const allowedOrigin =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173'; 

// ✅ Secure CORS configuration
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET'/* , 'POST', 'PUT', 'DELETE' */],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());

// API routes
const tracksRoutes = require('./routes/tracks');
app.use('/tracks', tracksRoutes);

const artistRoutes = require('./routes/artists');
app.use('/artists', artistRoutes);

const itemsRoutes = require('./routes/items');
app.use('/items', itemsRoutes);

// Serve static files from client build
app.use(express.static(path.join(__dirname, 'client-build')));

// Catch-all route to React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-build', 'index.html'));
});

// Listen on all interfaces for external access
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
