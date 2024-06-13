import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
   return (
      <div className="min-h-screen mt-20">
         <div className="flex flex-col p-5 max-w-4xl mx-auto md:flex-row md:items-center gap-10">
            {/* Left */}
            <div className="flex-1">
               <Link to="/" className="font-bold dark:text-white text-4xl">
                  <span className="px-2 py-1 bg-gradient-to-r from-slate-500 to-slate-800 rounded-lg text-white">
                     MyApp
                  </span>
                  Dev
               </Link>
               <p className="text-sm mt-5">
                  This project is under development. You can still log in with
                  your email or Google account to follow its progress. Thank
                  you.
               </p>
            </div>

            {/* Right */}
            <div className="flex-1">
               <form className="flex flex-col gap-4">
                  <div>
                     <Label value="Your username" />
                     <TextInput
                        type="text"
                        placeholder="Username"
                        id="username"
                     />
                  </div>
                  <div>
                     <Label value="Your email" />
                     <TextInput type="email" placeholder="Email" id="email" />
                  </div>
                  <div>
                     <Label value="Your password" />
                     <TextInput
                        type="password"
                        placeholder="Password"
                        id="password"
                     />
                  </div>
                  <div>
                     <Label value="Confirm your password" />
                     <TextInput
                        type="password"
                        placeholder="Password"
                        id="confirmPassword"
                     />
                  </div>
                  <Button
                     type="button"
                     className="text-white bg-gradient-to-r from-slate-800 to-slate-500 hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-800 shadow hover:shadow-lg"
                  >
                     Sign Up
                  </Button>
               </form>
               <div className="text-center text-sm mt-3">
                  <span>Have an account?</span>
                  <Link
                     to="/sign-in"
                     className="text-blue-900 p-2 hover:underline"
                  >
                     Sign In
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
