import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3000/${(
      (req.query['params'] as string[]) || []
    ).join('/')}`

    fetch(url)
      .then((resp) => resp.json())
      .then((jsonResp) => res.send(jsonResp))
      .then(resolve)
      .catch(reject)
  })
}
