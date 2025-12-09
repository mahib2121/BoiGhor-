import React, { use } from 'react';
import { AuthContex } from '../Firebase/AuthContex';

const useAuth = () => {
    const authinfo = use(AuthContex)
    return authinfo
};

export default useAuth;