import { useContext } from "react";
import { AuthContex } from "../Firebase/AuthContex";

const useAuth = () => {
    return useContext(AuthContex);
};

export default useAuth;
