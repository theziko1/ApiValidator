import { Schema , model } from "mongoose"

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number
    }
    

})

export const User  = model('User',UserSchema)