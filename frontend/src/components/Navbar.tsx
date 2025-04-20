import {Film, Heart, Menu, X} from "lucide-react";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const {pathname} = useLocation();

    return (
        <div className="min-w-full sticky top-0 z-10">

            <div className="flex items-center justify-between shadow-lg p-5">
                <div className="flex items-center">
                    <Film className="icon"/>
                    <h1 className="text-white ms-2 font-bold text-lg">MovieFinder</h1>
                </div>

                {/*Mobile Navbar*/}
                <div className="flex items-center md:hidden">
                    <Link to="/favorites">
                        <Heart className={`${pathname === "/favorites" ? "text-white" : "text-gray-400"} hover:text-primary cursor-pointer`}/>
                    </Link>
                    {mobileMenuIsOpen ? <X className="text-white ms-8 cursor-pointer"
                                           onClick={() => setMobileMenuIsOpen(false)}/> :
                        <Menu className="text-white ms-8 cursor-pointer"
                              onClick={() => setMobileMenuIsOpen(true)}/>}

                </div>

                {/*    Desktop navbar*/}
                <div className="hidden md:flex justify-end">
                    <nav className="flex items-center">
                        <Link to="/" className={`${pathname === "/" ? "text-white" : "text-gray-400"} hover:text-primary`}>Home</Link>
                        <Link to="#" className={`${pathname === "/new" ? "text-white" : "text-gray-400"} ms-4 hover:text-primary`}>New</Link>
                        <Link to="#" className={`${pathname === "/popular" ? "text-white" : "text-gray-400"} ms-4 hover:text-primary`}>Popular</Link>
                    </nav>
                    <Link to="/favorites">
                        <Heart className={`${pathname === "/favorites" ? "text-white" : "text-gray-400"} hover:text-primary cursor-pointer ms-4`}/>
                    </Link>
                </div>
            </div>

            {/*    Show the mobile nav menu if it has been toggled*/}
            {mobileMenuIsOpen && (
                <div className="bg-gray-900 animate-fadeIn shadow-lg absolute min-w-full">
                    <nav className="p-5">
                        <Link to="/" className="text-white block border-b py-3">Home</Link>
                        <Link to="#" className="text-white block border-b py-3">New</Link>
                        <Link to="#" className="text-white block border-b py-3">Popular</Link>
                    </nav>
                </div>
            )}

        </div>
    );
};

export default Navbar;