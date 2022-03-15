import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <header className="header">
            <div className="homeButtonContainer">
                <Link href="/">
                    <FontAwesomeIcon className="homeButton" icon={faHome} size="xs"/>
                </Link>
            </div>
            Smote
        </header>
    );
}

export default Header;
