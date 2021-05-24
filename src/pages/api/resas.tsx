import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('X-API-KEY', process.env['RESAS_API'])

    const response = await fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${req.body}`,
        {
            headers: requestHeaders,
        },
    )
    const jsonData = await response.json()
    res.status(200).json(jsonData)
}
