import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { User } from "@/shared/types";
import { number } from "joi";

const createUser = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const user = req.user as User
        const data = await userService.createUser({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profileImg: req.body.profileImg,
        })

        res.json({
            message: "created", 
            status: 201,
            data: data,
        })
    }catch (e){
        next(e)
    }
}


const getUsers = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const users = await userService.getUsers()
        res.json({
            message: "ok",
            status: 200,
            data: users,
        })
    } catch (e){
        next(e)
    }
} 


const updateUser = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const id = Number(req?.params?.id)
        const user = await userService.updateUser(id, {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profileImg: req.body.profileImg,
            phone: req.body.phone,
        }) 

        res.status(200).json({
            message: "ok",
            status: 200,
            data: user,
        })
     } catch (e) {
            next(e)
        }
    }

    const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const user = await userService.deleteUser(Number(id))

            res.status(200).json({
                status: 200,
                message: "OK",
                data: user,
            })
        }   catch (e) {
            next(e)
        }
    }



export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
}