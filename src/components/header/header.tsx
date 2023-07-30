import React from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { Logout } from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import { useHeaderStyles } from './header.style';

const Header = () => {
  const classes = useHeaderStyles();
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        Smote
      </Link>
      <IconButton className={classes.logoutButton} onClick={() => signOut()}>
        <Logout />
      </IconButton>
    </header>
  );
};

export default Header;
