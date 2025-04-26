import {useEffect, useState} from 'react';
import {Lock, Mail, User, X} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {signUpAction} from "../state/actions/signUpAction.ts";
import {signInAction} from "../state/actions/signInAction.ts";

const AuthModal = ({onClose}: { onClose: () => void }) => {
    const [signIn, setSignIn] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error, success, signInData} = useSelector((state: RootState) => state.auth);

    const clearFields = () => {
        setFullName("");
        setEmail("");
        setPassword("");
    }

    useEffect(() => {
        setTimeout(() => {
            if (success && !signIn) { // use has signed up successfully, navigate to sign in flow
                clearFields();
                setSignIn(true);
            } else if (success && signIn) { // user has signed in successfully, so there is a token sent from the server
                localStorage.setItem("token", signInData!.token);
                localStorage.setItem("userId", signInData!.userId.toString());
                localStorage.setItem("name", signInData!.name);
                onClose();
                window.location.reload();
            } else if (error) {
                alert(error);
            }
        }, 300)
    }, [success, error]);

    return (
        <div
            className="fixed z-100 inset-0 flex justify-center bg-black/50 items-center backdrop-blur-sm px-5 animate-fadeIn">
            <div className=" bg-background bg-opacity-75 flex-col w-full max-w-md rounded-xl p-5 overflow-hidden">
                <div className="relative w-full">
                    <h1 className="font-bold text-xl text-white text-center">{signIn ? "Welcome Back" : "Create Account"}</h1>
                    <X className="text-white absolute top-0 right-0 cursor-pointer" onClick={() => onClose()}/>
                </div>

                {/*Form*/}
                <div className="mt-7">
                    <form onSubmit={async (event) => {
                        event.preventDefault();
                        if (!signIn)
                            dispatch(signUpAction({name: fullName, email: email, password: password}))
                        else
                            dispatch(signInAction({email: email, password: password}))
                    }}>
                        {/* Full Name if creating an account */}
                        {!signIn && (
                            <div>
                                <label htmlFor="name" className="text-white font-bold">Full Name</label>
                                <div
                                    className={"relative bg-gray-700 items-center flex border border-gray-600 rounded-lg"}>
                                    <User className="absolute ms-2 text-gray-400"/>
                                    <input name="name" value={fullName}
                                           onChange={(e) => setFullName(e.target.value)}
                                           type="text" placeholder="Your Name"
                                           className="text-white p-2 w-full pl-10 placeholder-gray-400 outline-none"/>
                                </div>
                                <br/>
                            </div>
                        )}

                        {/*Email*/}
                        <label htmlFor="email" className="text-white font-bold">Email</label>
                        <div className={"relative bg-gray-700 items-center flex border border-gray-600 rounded-lg"}>
                            <Mail className="absolute ms-2 text-gray-400"/>
                            <input name="email" type="email" required value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="Your Email"
                                   className="text-white p-2 w-full pl-10 placeholder-gray-400 outline-none"/>
                        </div>

                        <br/>

                        {/*Password*/}
                        <label htmlFor="password" className="text-white font-bold">Password</label>
                        <div className={"relative bg-gray-700 items-center flex border border-gray-600 rounded-lg"}>
                            <Lock className="absolute ms-2 text-gray-400"/>
                            <input name="password" type="password" required value={password}
                                   onChange={(e) => setPassword(e.target.value)} placeholder="Your Password"
                                   className="text-white p-2 w-full pl-10 placeholder-gray-400 outline-none"/>
                        </div>

                        <br/>

                        {/*    Submit button */}
                        <button
                            className="bg-primary rounded-lg text-white w-full py-2 cursor-pointer flex justify-center items-center hover:bg-primary/50"
                            type={"submit"}>{!loading ? signIn ? "Sign In" : "Sign Up" :
                            <div className="rounded-full w-5 h-5 border-t-2 border-white animate-spin"/>}
                        </button>

                        <p className="text-gray-400 text-center mt-2">{signIn ? "Don't have an account?" : "Already have an account?"}<span
                            className="text-primary/80 cursor-pointer hover:text-primary" onClick={() => {
                            setSignIn((prevState) => !prevState);
                        }}> {signIn ? "Sign Up" : "Sign In"}</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;