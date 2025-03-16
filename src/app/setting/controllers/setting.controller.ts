import { NextFunction, Request,Response } from "express";
import settingService from "../services/setting.service";
import { User } from "@/shared/types";

const updateSetting = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const user = req.user as User
        const setting = await settingService.updateSetting({
            companyName: req.body.companyName,
            companyDescription:  req.body.companyDescription,
            companyLogo: req.body.companyLogo,
            companyAddress: req.body.companyAddress,
            updateBy: user.id
        })
        res.json({
            message: "OK",
            status: 200,
            data:  setting,
        })
    }catch (e){
        next(e)
    }
}

export default {
    updateSetting
}

// 200 succes
// 201 created