import React from "react";

class PasswordField extends React.Component {
    getInputClassName = () => {
        const { error } = this.props;
        let className =
            "bg-white rounded border focus:outline-none text-base px-4 py-2";
        if (error) className += " border-red-500";
        else className += " border-gray-400 focus:border-pink-500";
        return className;
    };

    render() {
        const { password, handleChange, error } = this.props;

        return (
            <div className="flex flex-col">
                <label
                    htmlFor="passwordLogin"
                    className="mt-4 mb-2 text-gray-800 text-sm"
                >
                    Password
                </label>
                <input
                    className={this.getInputClassName()}
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={password}
                />
                {!!error &&
                    (Array.isArray(error) ? (
                        <ul className="list-disc ml-3">
                            {error.map((errorMsg) => (
                                <li
                                    key={errorMsg}
                                    className="text-xs text-red-500 mt-1"
                                >
                                    {errorMsg}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-xs text-red-500 mt-1">{error}</p>
                    ))}
            </div>
        );
    }
}

export default PasswordField;
