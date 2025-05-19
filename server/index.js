const express = require('express');
var bodyParser = require('body-parser')
const cors = require("cors")
const app = express();
const port = 3000;

const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/user');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type'],
  credentials: true 
}));

app.use(bodyParser.json())

app.use('/health', healthRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});