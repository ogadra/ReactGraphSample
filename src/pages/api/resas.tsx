import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=${req.body}`, {
      headers: {'X-API-KEY': process.env.RESAS_API}
    });
    let jsonData = await response.json();
    res.status(200).json(jsonData);
}