 import mongoose ,{Aggregate, Schema, Types} from "mongoose";

import mongooseAggregatePaginate from "mongoose-Paginate-v2";

 const videoSchema = new Schema(
    {
        videoFile:{
            Types:String, //url
            required:true
        },
        thumbnail:{
            type:String,//url
            required:true
        },
        title: {
            type:String, //url
            required:true
        },
        descrition:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps:true
    }
 )

 videoSchema.plugin(mongooseAggregatePaginate)
 export const Video = mongoose.model("Video",videoSchema)