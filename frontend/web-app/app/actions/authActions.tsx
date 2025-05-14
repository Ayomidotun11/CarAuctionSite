
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import {cookies, headers} from 'next/headers';
import { NextApiRequest } from "next";


export async function getCurrentUser() {
    try {
        const session = await auth();

        if (!session) return null;

        return session.user

    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}

export async function getTokenWorkaround() {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map(c => [c.name, c.value])
        )
    } as NextApiRequest;

    return await getToken({req});
}
