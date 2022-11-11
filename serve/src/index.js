const express = require('express');
const cors = require('cors');
const Router = require('./routes/index');

require('dotenv').config();
require('./db/mongoose');

const app = express();

// Server
const port = process.env.TASK_APP_PORT;
const host = process.env.TASK_APP_HOST;

// Config
app.use(express.json());
app.use(cors());
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));

// Route
Router(app);

app.listen(port, ()=>{
    console.log(`Serve running on ${host}:${port}`)
})