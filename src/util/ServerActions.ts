"use server";
// Library imports
import { getServerSession } from 'next-auth/next';
import {ZodFormattedError} from 'zod';
// Custom imports
import * as dbUtils from "@/util/DBUtils";
import { AuthenticateUserSchema, CreateProblemSchema, CreateUserSchema } from "@/app/lib/zod_schemas";
import { DBUser } from "@/types";


/**
 * Gets the authenticated user.
 * 
 * @param includeAttemptedProblems {@code true} to include the attempted problems
 *                                 or {@code false} to exclude them
 * 
 * @returns the authenticated user or {@code null} if no user is logged in
 */
export async function getSessionUser(includeAttemptedProblems : boolean): Promise<DBUser | null> {
    try {
        const session = await getServerSession();
        const user = session?.user
    
        if (!user) {
            return null;
        }

        return await dbUtils.getUser(user.email!, includeAttemptedProblems);
    }
    catch (error) {
        console.log("Error getting the server session: " + error);

        return null;
    }
}

/**
 * Extracts the information form the passed form data to create a
 * new user in the database.
 * 
 * @param userInfo The form data that contains the information
 *                 about the user
 * 
 * @return an formatted error message if there is a validaton error,
 *         or a string if this is an error message from the database
 *         operation or {@code null} if the task is completed successfully.
 */
export async function createUserInDB(userInfo: FormData) :
             Promise<ZodFormattedError<{email: string;
                                        name: string;
                                        password: string }, string> | string | null> {
    const { email, name, password } = Object.fromEntries(userInfo);
    const zodResult = CreateUserSchema.safeParse({email, name, password});
    if (!zodResult.success) {
        return zodResult.error.format();
    }

    const [, error] = await dbUtils.createUser(email as string,
                                               name as string,
                                               password as string);
    return error;
}

/**
 * Adds a problem to the list of attempted problems by the user. If the problem
 * already exists, it updates the problem.
 * 
 * @param user the user who attempted or solved the problem
 * @param code The user code
 * @param correct {@code true} if the user solved the problem correctly
 *                or {@code false} otherwise
 *
 * @returns the authenticated user or {@code null} if no user is logged in
 */
export async function addAttemptedProblem(user: DBUser,
                                          problemID: string,
                                          code: string,
                                          correct: boolean) :
             Promise<[boolean, string | null]> {
    // Check if the user already attempted that problem
    // and if so, update is 'correct' value
    for (const problem of user.attemptedProblems ) {
        if (problem.problem_id === problemID) {
            // Check the current 'correct' value
            if (problem.correct !== correct) {
                // Update the value
                return dbUtils.updateAttemptedProblem(problem.id,
                                                      code,
                                                      correct);
            }
            else {
                // No action required since the attempted problem did not change
                return [true, null]; 
            }
        }
    }
    
    // If we reach this point, it means that the user had not attempted
    // the problem before
    const [dbAttemptedProblem, error] = await dbUtils.createAttemptedProblem(problemID,
                                                                             user.email,
                                                                             code,
                                                                             correct);

    return [dbAttemptedProblem !== null, error];
}

/**
 * Extracts the information form the passed form data to create a
 * new problem in the database.
 * 
 * @param problemInfo The form data that contains the information
 *                    about the problem
 * 
 * @return an formatted error message if there is a validaton error,
 *         or a string if this is an error message from the database
 *         operation or {@code null} if the task is completed successfully.
 */
export async function createProblemInDB(problemInfo: FormData) :
             Promise<ZodFormattedError<{ problem_id: string;
                                         title: string;
                                         category: string;
                                         difficulty: string;
                                         order: number; }, string> | string | null> {
    const { problem_id, title, category,
            difficulty, order, videoId, link } = Object.fromEntries(problemInfo);
    const zodResult = CreateProblemSchema.safeParse({problem_id,
                                                     title,
                                                     category,
                                                     difficulty,
                                                     order});
    if (!zodResult.success) {
        return zodResult.error.format();
    }

    const [, error] = await dbUtils.createProblem(problem_id as string,
                                                  title as string,
                                                  category as string,
                                                  difficulty as string,
                                                  Number(order),
                                                  videoId as string,
                                                  link as string);
    return error;
}

/**
 * Extracts the information form the passed form data to assert
 * the user credentials.
 * 
 * @param credentials The form data that contains the user credentials
 * 
 * @returns a ZodFormattedError in case of invalid input or
 *          {@code null} if the input is valid.
 */
export async function assertCredentials(credentials: FormData) :
             Promise<ZodFormattedError<{email: string; 
                                        password: string }, string> | null> {
    const { email, password } = Object.fromEntries(credentials);
    const zodResult = AuthenticateUserSchema.safeParse({email, password});
    if (!zodResult.success) {
        return zodResult.error.format();
    }

    return null;
}

/**
 * Extracts the information form the passed form data to validate
 * the user credentials (i.e., authenticate the user).
 * 
 * @param credentials The form data that contains the user credentials
 * 
 * @returns an array where the first element is the ZodFormattedError
 *          in case of invalid input or {@code null} if the input is valid
 *          and the second element the authenicated user or {@code null} if
 *          the credentials are invalid.
 */
export async function validateCredentials(credentials: FormData) :
             Promise<[ZodFormattedError<{email: string; password: string }, string> | null, 
                      DBUser | null]> {
    const { email, password } = Object.fromEntries(credentials);
    const zodResult = AuthenticateUserSchema.safeParse({email, password});
    if (!zodResult.success) {
        return [zodResult.error.format(), null];
    }
    
    const dbUser = await dbUtils.authenticateUser(email as string,
                                                  password as string);
    return [null, dbUser];
}

/**
 * @return the Rapid API key or {@code null} if not found
 */
export async function getRadidApiKey(): Promise<string | null> {
    return process.env.REACT_APP_RAPID_API_KEY ?? null;
}