import React from 'react';
import { createUseStyles } from 'react-jss';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { Logout } from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import { HEADER_HIGHT } from '../../const';

const useStyles = createUseStyles({
  header: {
    fontSize: 36,
    borderBottom: '1px solid lightgray',
    height: HEADER_HIGHT
  },
  logo: {
    textDecoration: 'none',
    color: '#027ffe',
    marginLeft: 16,
    lineHeight: `${HEADER_HIGHT}px`
  },
  logoutButton: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: '0px',
    width: '50px',
    height: HEADER_HIGHT,
    '& svg': {
      fontSize: '2rem'
    }
  }
});

const Header = () => {
  const classes = useStyles();
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
