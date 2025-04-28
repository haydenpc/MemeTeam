const express = require('express');
const app = express();
const port = 3000;

const healthRoutes = require('./routes/health');

app.use('/health', healthRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});