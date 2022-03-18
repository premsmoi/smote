import React from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
    return (
        <header className="header">
            <div className="homeButtonContainer">
                <Link href="/">
                    <IconButton className="homeButton">
                        <HomeIcon />
                    </IconButton>
                </Link>
            </div>
            Smote
        </header>
    );
}

export default Header;
