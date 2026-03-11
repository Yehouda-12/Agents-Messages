import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

import mongoose from 'mongoose'
import reportRoutes from './routes/reportRoutes.js';
import adminRoutes from './routes/adminRoutes.js'



dotenv.config()

const app =express()

const PORT = process.env.PORT || 5000


app.use(cors())

app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use('/reports', reportRoutes);
app.use('/admin',adminRoutes)

app.use('/auth',authRoutes)




mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to mongodb "))
.catch((err)=>console.error("error connexion :",err))


app.listen(PORT,()=>{
    console.log(`server run in : http://localhost:${PORT}`)
})


