import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const vedioschema = new Schema({
    vediofile:{
        type : String,
        required : true,
    },
    thubnail:{
        type : String,
        required : true,
    },  
    title :{
        type : String,
        required : true,
    },    
    description:{
        type : String,
        required : true,
    },    
    duration :{
        type : String,
        required : true,
    },
    view :{
        type : Number,
        default : 0
    },
    isPublished :{
        type : Boolean,
        default : true
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }

    
},
{
    timestamps : true
})
vedioschema.plugin(mongooseAggregatePaginate);
export const Vedio = mongoose.model("Vedio",vedioschema)