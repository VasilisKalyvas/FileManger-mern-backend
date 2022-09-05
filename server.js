import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import folderRoutes from './routes/folder.js';
import fileRoutes from './routes/file.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('Connected to Database!');
    }).catch(err => {
        throw err
    });
}
app.use(express.json());
app.use(
    cors({
      origin: true,
      methods: ["GET", "POST","PUT", "DELETE"],
      credentials: true,
    })
);

app.use('/api/folder', folderRoutes);
app.use('/api/file', fileRoutes);
app.use('uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req,res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!'
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(process.env.PORT, () => {
    connect()
    console.log('Connected to Server');
})
