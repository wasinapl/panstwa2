import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({silent: true})

var conn = mongoose.createConnection(process.env.DB_CONNECT, { useNewUrlParser: true});

export default conn;