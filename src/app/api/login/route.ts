// Library imports
import prismaInstance from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt'; // Install: 'npm i bcrypt' followed by 'npm i --save-dev @types/bcrypt'

type RequestBody = {
    username: string;
    password: string;
}

export async function POST(request: Request) {
    const body:RequestBody = await request.json();
    
    // Look up the user with the provided email as username
    const user = await prismaInstance.user.findFirst({
        where: {
            email: body.username
        }
    });

    // Check the encrypted password if the user exists
    if (user) {
        if (await bcrypt.compare(body.password, user.password)) {
            // Extract the user without the password from the user object
            const { password, ...userWithoutPassword } = user;
            
            return new Response(JSON.stringify(userWithoutPassword));
        }
    }
    return new Response(JSON.stringify(null));
};