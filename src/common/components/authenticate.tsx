import { ReactChild, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { getSession, signIn } from "next-auth/react"
import { userProfileAtom } from '../../atoms/authentication';

interface Props {
  children: ReactChild
}

const Authenticate = (props: Props) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);

  useEffect(() => {
    getSession().then(data => {
      const user = data?.user as UserProfile;
      if (user) {
        setUserProfile(user);
      } else {
        signIn();
      }
    });
  }, []);

  return userProfile ? props.children : null;
}

export default Authenticate;