'use server';
import { auth } from "@/auth";



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


