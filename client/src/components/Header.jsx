import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import {
   Button,
   Navbar,
   NavbarCollapse,
   NavbarLink,
   NavbarToggle,
   TextInput,
} from "flowbite-react";

export default function Header() {
   const path = useLocation().pathname;

   return (
      <Navbar className="border-b-2 shadow-sm">
         <Link
            to="/"
            className="self-center whitespace-nowrap font-semibold dark:text-white"
         >
            <span className="px-2 py-1 bg-gradient-to-r from-slate-500 to-slate-800 rounded-lg text-white">
               MyApp
            </span>
            Blog
         </Link>
         <form>
            <TextInput
               type="text"
               placeholder="Search..."
               rightIcon={AiOutlineSearch}
               className="hidden lg:inline"
            />
         </form>
         <Button className="items-center w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
         </Button>
         <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
               <FaMoon />
            </Button>
            <Link to="/sign-in">
               <Button color="gray" outline>
                  Sign In
               </Button>
            </Link>
            <NavbarToggle />
         </div>
         <NavbarCollapse>
            <NavbarLink active={path === "/"} as={"div"}>
               <Link to="/">Home</Link>
            </NavbarLink>
            <NavbarLink active={path === "/about"} as={"div"}>
               <Link to="/about">About</Link>
            </NavbarLink>
            <NavbarLink active={path === "/projects"} as={"div"}>
               <Link to="/projects">Projects</Link>
            </NavbarLink>
         </NavbarCollapse>
      </Navbar>
   );
}
