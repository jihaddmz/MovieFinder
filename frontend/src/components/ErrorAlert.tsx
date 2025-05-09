interface Props {
    text: string,
    onClick?: () => void
}

const ErrorAlert = ({text, onClick}: Props) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-100 animate-fadeIn transition">
            <div className="bg-background py-6 px-10 rounded-xl shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-2 text-red-600">Alert!</h2>
                <p className="text-white">{text}</p>
                <button onClick={onClick} className="mt-8 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorAlert;