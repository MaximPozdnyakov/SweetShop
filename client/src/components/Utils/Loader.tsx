import React from "react";
import LoaderSpinner from "react-loader-spinner";

class Loader extends React.Component {
    render() {
        return (
            <div className="absolute top-0 w-screen h-screen flex flex-wrap items-center justify-center">
                <LoaderSpinner
                    type="Oval"
                    color="#ed64a6"
                    height={80}
                    width={80}
                />
            </div>
        );
    }
}

export default Loader;
