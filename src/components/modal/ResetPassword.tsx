// Library imports
import React, { useEffect, useState } from 'react';
// Custom imports
import { ErrorMessage } from "@/util/UIUtil";

type ResetPasswordProps = {
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState('');
    // const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    /**
     * When the user clicks on the Reset Password button.
     * Sens an email with instructions to reset the password.
     */
    const handleResetPassowrd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent refreshing the page

        // Make sure that the email fields is filled
        if (!email) {
            //return showError('Please type in your email address');
        }

    //     const success = await sendPasswordResetEmail(email);
    //     if (success) {
    //         toast.success('Sent email',
    //                       {position: 'top-center', // Show the success window at the top-center
    //                        autoClose: 3000,        // Close the success window after 3sec
    //                        theme: 'dark'
    //                       });
    //     }
    }

    // /**
    //  * Error handling
    //  */
    // useEffect(() => {
    //     if (error) {
    //         alert(error.message);
    //     }
    // }, [error]); // [error]: dependency array

    return (
      <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={ handleResetPassowrd } >
        <h3 className="text-xl font-medium  text-white text-center">Reset your password</h3>
        <p className="text-sm text-white text-center">
          Enter your email address and we&apos;ll send you instructions on how to reset your password.
        </p>
        <div>
          <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
            Email
          </label>
          <input type="email"
                 name="email"
                 onChange = { (e) => setEmail(e.target.value) }
                 id="email"
                 className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                            block w-full p-2.5 bg-white-600 border-gray-500 placeholder-gray-400 text-back"
                 placeholder="Enter your e-mail here"
          />
        </div>
        <button type="submit"
                className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                           py-2.5 text-center bg-cardinal-red hover:bg-cardinal-red-s"
        >
          Reset Password
        </button>
      </form>
    );
};
export default ResetPassword;