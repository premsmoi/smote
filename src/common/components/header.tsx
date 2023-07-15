import React from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { Logout } from '@mui/icons-material';
import { signOut } from 'next-auth/react';

const Header = () => {
    return (
        <header className="header">
            <Link className="logo" href="/">
                Smote
            </Link>
            <IconButton className="logout-button" onClick={() => signOut()}>
                    <Logout />
                </IconButton>
        </header>
    );
}

export default Header;
