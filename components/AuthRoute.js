// components/AuthRoute.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthRoute = ({ children }) => {
    const router = useRouter();

    // Simulate authentication check
    const isAuthenticated = true; // Replace with your actual authentication logic

    useEffect(() => {
        
        if (localStorage.getItem('userLoggedIn') != "true") {
            console.log("local", localStorage.getItem('userLoggedIn'))
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    // Render the protected routes or null if not authenticated
    return isAuthenticated ? children : null;
};

export default AuthRoute;
