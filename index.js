import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the build directory
app.use(express.static(join(__dirname, 'dist')));

// Serve JavaScript modules with the correct MIME type
app.get('*.js', (req, res, next) => {
  res.type('application/javascript');
  next();
});

// Handle all routes and serve the main index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
