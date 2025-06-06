import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

import path from "path";

dotenv.config({});

const app = express();

const _dirname =path.resolve();


//->Demo api request:-
// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"I am coming from backend",
//         success:true
//     })
// })

//->Middlewares:-
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//->Cross-Origin Resource Sharing :-
const corsOptions = {
    // origin:'http://localhost:5173',
    origin:"https://next-hire-3.onrender.com/",
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


//For Hosting website :-
app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
});




app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})