import {CircleUserRound, Film, Heart, Menu, User, X} from "lucide-react";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import AuthModal from "./AuthModal.tsx";
import {isSignedIn} from "../config/helpers.ts";

const Navbar = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isAuthModalVisible, setAuthModalVisibility] = useState(false)
    const {pathname} = useLocation();

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        window.location.reload();
    }

    return (
        <div className="min-w-full sticky top-0 z-10 navbar">

            <div className="flex items-center justify-between shadow-lg p-5">
                <div className="flex items-center">
                    <Film className="icon"/>
                    <h1 className="text-white ms-2 font-bold text-lg">MovieFinder</h1>
                </div>

                {/*Mobile Navbar*/}
                <div className="flex items-center md:hidden">
                    <Link to="/favorites">
                        <Heart id={"navbarHeart"}
                               className={`${pathname === "/favorites" ? "text-white" : "text-gray-400"} hover:text-primary cursor-pointer`}/>
                    </Link>
                    {mobileMenuIsOpen ? <X className="text-white ms-8 cursor-pointer"
                                           onClick={() => setMobileMenuIsOpen(false)}/> :
                        <Menu className="text-white ms-8 cursor-pointer"
                              onClick={() => setMobileMenuIsOpen(true)}/>}

                </div>

                {/*    Desktop navbar*/}
                <div className="hidden md:flex justify-end items-center gap-4">
                    <nav className="flex items-center gap-4">
                        <Link to="/"
                              className={`${pathname === "/" ? "text-white" : "text-gray-400"} hover:text-primary`}>Home</Link>
                        <Link to="#"
                              className={`${pathname === "/new" ? "text-white" : "text-gray-400"} hover:text-primary`}>New</Link>
                        <Link to="#"
                              className={`${pathname === "/popular" ? "text-white" : "text-gray-400"} hover:text-primary`}>Popular</Link>
                    </nav>
                    <Link to="/favorites">
                        <Heart
                            className={`${pathname === "/favorites" ? "text-white" : "text-gray-400"} hover:text-primary cursor-pointer`}/>
                    </Link>
                    {!isSignedIn() && (
                        <button
                            onClick={() => {
                                setMobileMenuIsOpen(false);
                                setAuthModalVisibility(true);
                            }}
                            className="text-white flex bg-primary justify-center items-center py-2 rounded-xl px-10 cursor-pointer hover:bg-primary/80">
                            <CircleUserRound className="me-2"/>Sign In
                        </button>
                    )}

                    {isSignedIn() && (
                        <div className="rounded-full bg-primary text-white p-2 cursor-pointer"
                             onClick={() => setIsProfileModalOpen((prevState) => !prevState)}>
                            <User/>
                        </div>
                    )}
                </div>
            </div>

            {isProfileModalOpen && (
                <div className="absolute right-0 bg-background rounded-b-lg py-3 px-5">
                    <p className="text-white">Your Name: {localStorage.getItem("name")}</p>
                    <p className="text-red-600 mt-5 text-center cursor-pointer hover:text-red-500" onClick={logOut}> Sign out</p>
                </div>
            )}

            {/*    Show the mobile nav menu if it has been toggled*/}
            {mobileMenuIsOpen && (
                <div className="bg-gray-900 animate-fadeIn shadow-lg absolute min-w-full">
                    <nav className="p-5">
                        <Link to="/" className="text-white block border-b py-3">Home</Link>
                        <Link to="#" className="text-white block border-b py-3">New</Link>
                        <Link to="#" className="text-white block border-b py-3">Popular</Link>

                        {isSignedIn() && (
                            <div className="mt-3">
                                <p className="text-white">Signed in as: {localStorage.getItem("name")}</p>
                                <p className="text-red-600 mt-2 cursor-pointer hover:text-red-500" onClick={logOut}> Sign out</p>
                            </div>
                        )}

                        {!isSignedIn() && (
                            <button
                                onClick={() => {
                                    setMobileMenuIsOpen(false);
                                    setAuthModalVisibility(true);
                                }}
                                className="text-white flex bg-primary min-w-full justify-center items-center mt-3 py-2 rounded-lg">
                                <CircleUserRound className="me-2"/>Sign In
                            </button>
                        )}
                    </nav>
                </div>
            )}

            {isAuthModalVisible && (
                <AuthModal onClose={() => setAuthModalVisibility(false)}/>
            )}

        </div>
    );
};

export default Navbar;