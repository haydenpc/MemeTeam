const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/user');
app.use(bodyParser.json())


app.use('/health', healthRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});