import { ApiError } from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
// import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadoncloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registeruser = asyncHandler(async (req,res) => {
   //get user detail form the frontend
   //validation - not empty
   //check if user is already exist:username
   //check for the avatar and images
   //upload them to cloudinary
   //create user object - create enty in db
   //remove password and refresh token field from response
   //check for user creation 
   //return res

   //1) userdetails form the frontend
   //req.body => get data from the front in json format
    const {fullname,email,username,password} = req.body
    
    // if(fullName = ""){
    //     throw new ApiError(400,"fullname is required")
    // }
    //check if the data is not empty
    if(
        [fullname,email,username,password].some((field) => field?.trim() === "")

    )    {
        throw new ApiError(400,"something went wrong")
    }
    //check if the user exist or not

    const existeduser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existeduser){
        throw new ApiError(409,"user with email or username already exist")
    }
    console.log("email: ",email)
    console.log(req.files)
    const avatarLocalpath = req.files?.avatar?.[0]?.path;
    const coverimageLocalpath = req.files?.coverimage?.[0]?.path;
 
    if(!avatarLocalpath){
        throw new ApiError(400,"avatar file is required")
    }
    const avatar = await uploadoncloudinary(avatarLocalpath)
    const converImage = await uploadoncloudinary(coverimageLocalpath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    if(!converImage){
        throw new ApiError(400,"Avatar file is required")
    }
    const user = await User.create(
        {
            fullname,
            avatar:avatar.url,
            coverImage:converImage?.url || "",
            email,
            password,
            username:username
        }
    )

   const createduser = await User.findById((user._id)).select(
    "-password -refreshtoken"
   )
   if(!createduser){
    throw new ApiError(500,"something went wron while extracting the data")
   }

   return res.status(201).json(
    new ApiResponse(200,createduser,"user_registered_successfully")
   )

})


export {registeruser}