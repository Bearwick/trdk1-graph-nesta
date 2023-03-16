import { type Request, type Response, Router } from 'express'
import { getODAProblems } from '../database/ontology'

const router = Router()

/**
 * Interface is used to go around the fact that the query request does not know what type the query parameters are. Here those are specified
 */
interface OdaProblemParams {
  limit: number
  offset: number
}

router.get('/ODAProblem', function(req: Request<unknown, unknown, unknown, OdaProblemParams>, res: Response) {
  const limit: number = req.query.limit
  const offset: number = req.query.offset
  getODAProblems(limit, offset).then(r => {
    res.send(r.data.results.bindings)
  }).catch(() => res.send('Error'))
})

export default router
