import { type Request, type Response, Router } from 'express'
import { addODAProblem, getODAProblems } from '../database/ontology'

const router = Router()

/**
 * Interface is used to go around the fact that the query request does not know what type the query parameters are. Here those are specified
 */
interface OdaProblemParams {
  limit: number
  offset: number
}

interface AddOdaProblemParams {
  title: string
  specificProblem: string
  clearDataProduct: string
  accessibleData: string
  supplier: string
}

router.get('/ODAProblem', function(req: Request<unknown, unknown, unknown, OdaProblemParams>, res: Response) {
  const limit: number = req.query.limit
  const offset: number = req.query.offset
  getODAProblems(limit, offset).then(r => {
    res.send(r.data.results.bindings)
  }).catch(() => res.send('Error'))
})

router.get('/AddProblem', function(req: Request<unknown, unknown, unknown, AddOdaProblemParams>, res: Response) {
  const query = req.query
  addODAProblem(query.title, query.specificProblem, query.clearDataProduct, query.accessibleData, query.supplier).then(r => {
    res.send(r)
  }).catch((r) => res.send(r))
})

export default router
