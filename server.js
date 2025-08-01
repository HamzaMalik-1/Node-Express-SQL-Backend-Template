const { development } = require('./config/config');
const app = require('./app');
const { connectDB, createDatabaseIfNotExists } = require('./config/db');
const { User, Category, Product } = require('./models');
// const {User}
const { PORT } = development;

// Basic route
// app.get('/', (req, res) => {
//   res.json({ success: true, message: "Running" });
// });

// app.post(
//   '/upload',
//   upload.single('image'),
//   (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     res.status(200).json({
//       message: 'Uploaded successfully!',
//       imageUrl: req.file.path,
//       publicId: req.file.filename,
//     });
//   },
//   (err, req, res, next) => {
//     console.error('Multer/Upload Error:', err);

//     // Handle Multer size error
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ message: 'File too large (Max 5MB)' });
//     }

//     // Handle Multer unexpected field
//     if (err.name === 'MulterError') {
//       return res.status(400).json({ message: err.message });
//     }

//     // Handle any other error
//     return res.status(500).json({ message: err.message || 'Upload failed' });
//   }
// );

// Database and server initialization
(async () => {
  try {
    await createDatabaseIfNotExists();
    await User.sync()
    await Category.sync()
    await Product.sync()
    await connectDB();
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Optional: Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1); // Exit with error code
  }
})();