import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connect from './database/conn.js'
import router from './router/route.js';
const app = express();

/** Middlewares */

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const PORT = 8080 || 'https://login-system-p4g2.vercel.app/';

/** http requests */
app.get('/', (req, res) => {
    res.status(201).json('Home Get Request');
})

/** Api requests */

app.use('/api', router);

app.get('/', (req, res) => {
    res.send(`Server running on ${PORT}`);
  })

/** Start of server */
connect().then(()=>{
    try {
        app.listen(port, () =>{
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error =>{
    console.log("Invalid Database Connction");
})
