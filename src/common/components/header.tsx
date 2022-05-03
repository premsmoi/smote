import React from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { Home, Logout } from '@mui/icons-material';
import { signOut } from 'next-auth/react';

const Header = () => {
    return (
        <header className="header">
            <div className="homeButtonContainer">
                <Link href="/">
                    <IconButton className="homeButton">
                        <Home />
                    </IconButton>
                </Link>
            </div>
            Smote
            <div className="logoutButtonContainer">
                <IconButton className="logoutButton" onClick={() => signOut()}>
                    <Logout />
                </IconButton>
            </div>
        </header>
    );
}

export default Header;
