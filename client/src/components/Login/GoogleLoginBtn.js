import React from "react";

class GoogleLoginBtn extends React.Component {
    handleGoogleLogin = (e) => {
        e.preventDefault();
        window.location = `${window.location.origin}/api/google-auth`;
    };

    render() {
        return (
            <button
                className="text-white mt-2 mb-4 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg relative"
                onClick={handleGoogleLogin}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    viewBox="0 0 32 32"
                    width="28px"
                    height="28px"
                    className="absolute"
                    style={{ left: "10px" }}
                >
                    <path d="M 16.0039 14.0625 L 16.0039 18.2656 L 21.9922 18.2656 C 21.2109 20.8125 19.082 22.6367 16.0039 22.6367 C 12.3398 22.6367 9.36719 19.6641 9.36719 16 C 9.36719 12.3359 12.3359 9.36328 16.0039 9.36328 C 17.6523 9.36328 19.1563 9.96875 20.3164 10.9648 L 23.4102 7.86719 C 21.457 6.08594 18.8555 5 16.0039 5 C 9.92578 5 5 9.92578 5 16 C 5 22.0742 9.92578 27 16.0039 27 C 25.2383 27 27.2773 18.3633 26.3711 14.0781 Z" />
                </svg>
                Login with Google
            </button>
        );
    }
}

export default GoogleLoginBtn;
