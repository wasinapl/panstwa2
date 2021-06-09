import mongoose from "mongoose"

var conn = mongoose.createConnection('mongodb+srv://wasina:Wrzysztof12@cluster0.zif31.mongodb.net/panstwa?retryWrites=true&w=majority', { useNewUrlParser: true});

export default conn;