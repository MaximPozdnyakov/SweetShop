import React from "react";
import { When } from "react-if";

interface IProps {
    email: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<any>) => void;
}

class EmailField extends React.Component<IProps> {
    getInputClassName = () => {
        const { error } = this.props;
        let className =
            "bg-white rounded border focus:outline-none text-base px-4 py-2";
        if (error) className += " border-red-500";
        else className += " border-gray-400 focus:border-pink-500";
        return className;
    };

    render() {
        const { email, handleChange, error } = this.props;
        return (
            <div className="flex flex-col mt-3">
                <label
                    htmlFor="emailLogin"
                    className="mb-2 text-gray-800 text-sm"
                >
                    Email
                </label>
                <input
                    className={this.getInputClassName()}
                    placeholder="Email"
                    type="email"
                    id="email"
                    onChange={handleChange}
                    value={email}
                />
                <When condition={!!error}>
                    <p className="text-xs text-red-500 mt-1">{error}</p>
                </When>
            </div>
        );
    }
}

export default EmailField;
