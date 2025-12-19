 import { Response } from "express";
 const sendResponse  = (res:Response, code:any ,message:any, data :any= null) => {
  return res.status(code).json({
    success:true,
    message,
    data,
  });
};

const sendErrorResponse = (res:Response, code:any, message:any) => {
  return res.status(code).json({
    success: false,
    message,
  });
};

export {sendResponse,sendErrorResponse};