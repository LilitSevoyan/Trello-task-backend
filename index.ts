import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv  from "dotenv"
import { ConnectionOptions } from "tls"
dotenv.config()
const app = express()
const Router = require("./router/router")

app.use(express.json());
app.use(cors())
app.use("/",Router)

const CONNECTION_URL = `${process.env.MONGOOSE_CONNECTION_URL}`


mongoose.connect(
    CONNECTION_URL,
     { useNewUrlParser:true, useUnifiedTopology: true } as ConnectionOptions,
    (err) => {
        if (err) {
            console.log(err );
        }else{
            console.log("Mongoose is Working!");
        }
    }
 )

 app.listen(8000, () => console.log("server is started"))