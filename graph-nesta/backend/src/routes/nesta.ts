import { type Response, Router } from 'express'
import fs from 'fs'

export const router = Router()

router.get('', function (_, res: Response) {
  const path = './public/NestaGuide.pdf'
  if (fs.existsSync(path)) {
    res.contentType('application/pdf')
    fs.createReadStream(path).pipe(res)
  } else {
    res.status(500)
    res.send('File not found')
  }
})
