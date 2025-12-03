const express = require("express");
const cors = require("cors");

const app = express();

// --- Allowed origins from environment variable ---
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

// --- CORS Middleware ---
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log('Blocked CORS origin:', origin);
    console.log('let\'s see', process.env.CORS_ORIGIN);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin'],
  optionsSuccessStatus: 204
}));

// --- Body Parser Middleware ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Routes ---
const generateProblemRoutes = require('./routes/generateProblemRoutes');
const authRoutes = require('./routes/authRoutes');
const generateSolutionRoutes = require('./routes/generateSolutionRoutes');
const generateTestcaseRoutes = require('./routes/generateTestcaseRoutes');

app.use('/api/generate-problem', generateProblemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/generate-solution', generateSolutionRoutes);
app.use('/api/generate-testcase', generateTestcaseRoutes);

module.exports = app;
