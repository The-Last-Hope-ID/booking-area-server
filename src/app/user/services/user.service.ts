import userValidation from "../validations/user.validation"
import db from "@/config/db"
import { validate } from "@/shared/lib/utils"


// create
const createUser = async (data: {
    name: string
    username: string
    email: string
    password: string
    profileImg: string
}) => {
    const payload = validate(userValidation.createUserSchema,{
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        profileImg: data.profileImg,
    })

    const user = await db.user.create({
        data:{
            name: payload.name,
            username: payload.username,
            email: payload.email,
            password: payload.password,
            profileImg: payload.profileImg,
            isAdmin: true,
        }
    })
    return user
}


// get
const getUsers = async () => {
    const users = await db.user.findMany({
        where: {
            isAdmin: true,
        }
    })
    return users
}

//update
const updateUser = async (userId: number, data: 
    {
    name: string
    username: string
    email: string
    password: string
    profileImg: string
    phone: string
}) => {
    const payload = validate (userValidation.updateUserSchema, {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        profileImg: data.profileImg,
        phone: data.phone,
    })
        const users = await db.user.findMany()

        const res = await db.user.update({
        where: {
            id: userId,
        },
        data: {
            name: payload.name,
            username: payload.username,
            email: payload.email,
            password: payload.password,
            profileImg: payload.profileImg,
            phone: payload.phone,
        }
    })
    return res
}

const deleteUser = async (userId: number) => {
    const user = await db.user.delete({
        where: {
            id: userId,
        },
    })

    return user
}

export default {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
}