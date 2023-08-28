// Library imports
import { z } from 'zod';

/**
 * Custom validation function to check if a string represents a positive integer
 */
const isPositiveInteger = (valStr: string) => {
    const val = Number(valStr);
    return Number.isInteger(val) && val > 0;
};

/**
 * Validation schema for the required field values
 * in a client form before creating a new user
 * in the database (i.e., DBUser).
 */
export const CreateUserSchema = z.object({
    email: z.string().min(3, { message: "The email is required" }), // Email has at least 3 characters
    name: z.string().min(1, { message: "The name is required" }),
    password: z.string().min(4, { message: "The passoword is required and must be at least 4 characters long." }),
});

/**
 * Validation schema for the required field values
 * in a client form before authenticating a user.
 */
export const AuthenticateUserSchema = z.object({
    email: z.string().min(3, { message: "The email is required" }), // Email has at least 3 characters
    password: z.string().min(4, { message: "The passoword is required and must be at least 4 characters long." }),
});


/**
 * Validation schema for the required field values
 * in a client form before creating a new problem
 * in the database (i.e., DBProblem)
 */
export const CreateProblemSchema = z.object({
    problem_id: z.string().min(1, { message: "The problem ID is required" }),
    title: z.string().min(1, { message: "The problem title is required" }),
    category: z.string().min(1, { message: "The problem category is required" }),
    difficulty: z.string().min(1, { message: "The problem difficulty is required" }),
    order: z.string().min(1, { message: "The problem order is required" })
                     .refine(isPositiveInteger, {message: "Must be a positive integer"})
});


/**
 * Validation schema for the required fields to create a ChatMessage
 * (i.e., ChatGPT message).
 */
export const ChatMessageSchema = z.object({
    id: z.string({
        required_error: "id is required",
        invalid_type_error: "id must be a string",
    }).min(1, { message: "The id must be at least one character long" }),
    isUserMessage: z.boolean({
        required_error: "isUserMessage is required",
        invalid_type_error: "isUserMessage must be a boolean",
    }),
    text: z.string({
        required_error: "text is required",
        invalid_type_error: "text must be a string",
    }).min(1, { message: "The text must be at least one character long" })
});

/**
 * Validation schema for the required fields to create an array of
 * ChatMessage objects (i.e., ChatGPT message history).
 */
export const ChatMessageHistorySchema = z.array(ChatMessageSchema);


