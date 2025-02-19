"use client";
import React, { useEffect } from 'react';
import "./Header.css";
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    // Redirect user to /dropoff if authenticated
    useEffect(() => {
        if (session && pathname === "/") {
            router.push("/dropoff");
        }
    }, [session, pathname, router]);

    const handleLogout = async () => {
        const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`;
        
        await signOut({ redirect: false });
        window.location.href = keycloakLogoutUrl;
    };

    return (
        <div className='header'>
            <div className='header-content'>
                <div className='logo'>
                    <span><img src='./logo.svg' alt="Logo" /></span>
                </div>
                <div className='title'>
                    <span><p>AMENTUM WEB SOLUTION</p></span>
                </div>
                <div className='profile'>
                    {session ? (
                        <>
                            <img src='./profile.png' alt='User Profile' className='profile-pic' />
                            <div className='user-info'>
                                <span>Hello {session.user.name}</span>
                                <p onClick={handleLogout} className='logout'>Log Out ▼</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <img src='./profile.png' alt='User Profile' className='profile-pic' />
                            <div className='user-info'>
                                <p onClick={() => signIn("keycloak", { prompt: "login" })} className='logout'>Login ▼</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
