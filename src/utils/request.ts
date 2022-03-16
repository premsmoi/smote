export const request = (url: string, option?: RequestInit) => {
    return fetch(url, {
        ...option,
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.json());
};

export const queryStringToNumber = (value: string | string[]): number => {
    return parseInt(value.toString());
};