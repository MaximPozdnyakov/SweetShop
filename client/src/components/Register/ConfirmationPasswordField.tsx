import React from "react";
import { When } from "react-if";

interface IProps {
    confirmationPassword: string;
    error: string | undefined;
    handleChange: (e: React.ChangeEvent<any>) => void;
}

class ConfirmationPasswordField extends React.Component<IProps> {
    getInputClassName = () => {
        const { error } = this.props;
        let className =
            "bg-white rounded border focus:outline-none text-base px-4 py-2";
        if (error) className += " border-red-500";
        else className += " border-gray-400 focus:border-pink-500";
        return className;
    };

    render() {
        const { confirmationPassword, handleChange, error } = this.props;
        return (
            <div className="flex flex-col">
                <label
                    htmlFor="passwordLogin"
                    className="mt-4 mb-2 text-gray-800 text-sm"
                >
                    Confirm password
                </label>
                <input
                    className={this.getInputClassName()}
                    placeholder="Password"
                    type="password"
                    id="confirmationPassword"
                    onChange={handleChange}
                    value={confirmationPassword}
                />
                <When condition={!!error}>
                    <p className="text-xs text-red-500 mt-1">{error}</p>
                </When>
            </div>
        );
    }
}

export default ConfirmationPasswordField;
