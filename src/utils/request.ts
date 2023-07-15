import { trackPromise} from 'react-promise-tracker';

const checkResponseStatus = (res: Response<unknown>) => {
    if (res.status === 401) {
        throw Error('Unathorized');
    }

    return res;
}

export const request = <Res>(url: string, option?: RequestInit, showBackdrop = true) => {
    const fetchPromise: Promise<Res> = fetch(url, {
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