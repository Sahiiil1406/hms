const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes.js');
const app = express();
require('dotenv').config();
const connectDb=require('./config/db');

connectDb();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(cookieParser())


//routes
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
})
