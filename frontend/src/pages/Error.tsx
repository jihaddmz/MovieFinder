import {useLocation} from "react-router-dom";
import {Ban} from "lucide-react";

const Error = () => {
    const {state} = useLocation();

    return (
        <div className="flex flex-col fixed inset-0 justify-center items-center">
            <Ban className="text-red-600 w-10 h-10"/>
            <h3 className="text-white text-xl mt-2"><span className="text-secondary">ERROR: {state.statusCode}</span> {state.message.toString().toUpperCase()}</h3>
        </div>
    );
};

export default Error;