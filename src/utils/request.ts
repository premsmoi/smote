import { trackPromise} from 'react-promise-tracker';
import { signOut } from "next-auth/react"

const checkResponseStatus = (res: Response) => {
    if (res.status === 401) {
        signOut();
    }

    return res;
}

export const request = <T>(url: string, option?: RequestInit, showBackdrop = true) => {
    const fetchPromise: Promise<T> = fetch(url, {
        ...option,
        headers: {
            'Content-type': 'application/json'
        }
    }).then(checkResponseStatus).then(res => res.json());

    if (showBackdrop) return trackPromise(fetchPromise);

    return fetchPromise;
};

export const queryStringToNumber = (value: string | string[]): number => {
    return parseInt(value.toString());
};