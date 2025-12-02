const express = require("express");
const cors = require("cors");

const app = express();

// --- Allowed origins ---
const allowedOrigins = [
  'http://localhost:5173',
];

// --- CORS Middleware ---
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log('Blocked CORS origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin'],
  optionsSuccessStatus: 204
}));

// --- Body Parser Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
const generateProblemRoutes = require('./routes/generateProblemRoutes');

app.use('/api/generate-problem', generateProblemRoutes);

module.exports = app;
