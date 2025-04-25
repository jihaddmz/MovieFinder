import {CircleUserRound, Film, Heart, Menu, X} from "lucide-react";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import AuthModal from "./AuthModal.tsx";

const Navbar = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [isAuthModalVisible, setAuthModalVisibility] = useState(false)
    const {pathname} = useLocation();

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
                    <button
                        onClick={() => {
                            setMobileMenuIsOpen(false);
                            setAuthModalVisibility(true);
                        }}
                        className="text-white flex bg-primary justify-center items-center py-2 rounded-xl px-10 cursor-pointer hover:bg-primary/80">
                        <CircleUserRound className="me-2"/>Sign In
                    </button>
                </div>
            </div>

            {/*    Show the mobile nav menu if it has been toggled*/}
            {mobileMenuIsOpen && (
                <div className="bg-gray-900 animate-fadeIn shadow-lg absolute min-w-full">
                    <nav className="p-5">
                        <Link to="/" className="text-white block border-b py-3">Home</Link>
                        <Link to="#" className="text-white block border-b py-3">New</Link>
                        <Link to="#" className="text-white block border-b py-3">Popular</Link>
                        <button
                            onClick={() => {
                                setMobileMenuIsOpen(false);
                                setAuthModalVisibility(true);
                            }}
                            className="text-white flex bg-primary min-w-full justify-center items-center mt-3 py-2 rounded-lg">
                            <CircleUserRound className="me-2"/>Sign In
                        </button>
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