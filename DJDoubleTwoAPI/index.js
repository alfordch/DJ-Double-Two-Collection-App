const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middlewares, if any
app.use(express.json());

// API routes
const tracksRoutes = require('./routes/tracks');
app.use('/tracks', tracksRoutes);

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