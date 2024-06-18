const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}
export {asyncHandler}


//const asyncHandlers = (func) => async () => {}

//this is Try catch Block Code
// const asyncHandlers = (fn) => async (req,res,next) =>{
//     try{
//         await fn(req,res,next)
//     }
//     catch(error){
//         console.log("/utils/asynchandelres",error);
//         res.status(err.code || 500 ).json({
//             success : false,
//             message : err.message
//         })
//     }
// }







