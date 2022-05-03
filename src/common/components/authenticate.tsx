import { useEffect } from 'react';
import { useRecoilState } from "recoil";
import { getSession, signIn } from "next-auth/react"
import { isAuthenticatedAtom, userProfileAtom } from '../../atoms/authentication';

interface Props {
  children: any
}

const Authenticate = (props: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    getSession().then(data => {
      const user = data?.user as GoogleUserProfile;
      if (user) {
        setIsAuthenticated(true);
        setUserProfile(user);
      } else {
        signIn();
      }
    });
  }, []);

  return isAuthenticated ? props.children : null;
}

export default Authenticate;