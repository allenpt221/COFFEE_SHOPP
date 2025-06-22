import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import { connectDB } from './lib/db.js';

import authRouter  from './router/auth.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors({origin: "*"}));


app.get('/', (req, res) => {
    res.send('server is running');
})

app.use('/', authRouter );



app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
    connectDB();
});