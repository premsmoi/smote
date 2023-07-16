import { ReactElement, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { getSession, signIn } from "next-auth/react"
import { userProfileAtom } from '../../atoms/authentication';

interface Props {
  children: ReactElement
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
  }, [setUserProfile]);

  return userProfile ? props.children : null;
}

export default Authenticate;