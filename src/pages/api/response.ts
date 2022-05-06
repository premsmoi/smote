import { NextApiResponse } from "next/types";

export const unauthorized = (res: NextApiResponse) => {
    res.status(401);
    res.send(null);
};