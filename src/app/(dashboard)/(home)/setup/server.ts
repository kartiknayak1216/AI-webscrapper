"use server"

import { currentUser } from "@clerk/nextjs/server";

export async function Setup(){

    const user = await currentUser();

    if(!user){
        return
    }

    const bala
}