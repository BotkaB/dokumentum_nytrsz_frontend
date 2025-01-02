import { createContext, useContext, useState } from "react";

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
    const [validationErrors, setValidationErrors] = useState({});

    const validateEmailAndPassword = (data) => {
        let errors = {}

        if (data.email.length < 1 || !/[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/.test(data.email)) {
            errors.email = ["Az email üres vagy nem megfelelő formátumú."]
        }
        if (data.password.length < 8 || data.password.length > 16) {
            errors.password = ["A jelszó 8 és 16 karakter közötti kell legyen."]
        }
        setValidationErrors(errors)
        return errors
    }

    const validateRegistration = (data) => {
        let errors = validateEmailAndPassword(data)
        if (data.name.length < 1 || data.name.length > 255) {
            errors.name = ["A névnek 1-255 karakter között kell lennie."]
        }
        if (data.password !== data.password_confirmation) {
            errors.password_confirmation = ["A két jelszó nem egyezik."]
        }

        setValidationErrors(errors)
        return errors
    }

    return (
        <ValidationContext.Provider value={{ validationErrors, validateEmailAndPassword, validateRegistration }}>
            {children}
        </ValidationContext.Provider>
    );

}
export default function useValidationContext() {
    return useContext(ValidationContext);
}