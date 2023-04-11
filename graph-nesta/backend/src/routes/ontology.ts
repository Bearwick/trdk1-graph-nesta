import { type Request, type Response, Router } from 'express'
import {
  addCategories,
  addODAProblem,
  addUser, findUser,
  getODAProblems,
  setAdmin,
  subscribe,
  unsubscribe,
} from '../database/ontology'
import {
  type AddCategoriesParams,
  type AddOdaProblemParams,
  type AddUserParams,
  type FindUserParams,
  type OdaProblemParams,
  type SetAdminParams,
  type SubscribeParams,
} from '../interfaces/interfaces'

const router = Router()

/**
 * Interface is used to go around the fact that the query request does not know what type the query parameters are. Here those are specified
 */

/**
 * @swagger
 * /OdaProblem:
 *    get:
 *        description: Add new ODA problem to database
 *        parameters:
 *          - in: path
 *            name: limit
 *            required: true
 *            description: Limit of objects to retrieve
 *            schema:
 *              type: number
 *          - in: path
 *            name: offset
 *            required: true
 *            description: offset
 *            schema:
 *              type: number
 *
 *
 */
router.get('/ODAProblem', function(req: Request<unknown, unknown, unknown, OdaProblemParams>, res: Response) {
  const limit: number = req.query.limit
  const offset: number = req.query.offset
  const searchString: string = req.query.searchString
  const category: string = req.query.category
  getODAProblems(limit, offset, searchString, category).then(r => {
    res.send(r.data.results.bindings)
  }).catch((r) => res.send(r))
})

router.get('/AddProblem', function(req: Request<unknown, unknown, unknown, AddOdaProblemParams>, res: Response) {
  const query = req.query
  addODAProblem(query.title, query.specificProblem, query.clearDataProduct, query.accessibleData, query.definedAction, query.supplier, query.userMail).then(r => {
    res.send(r)
  }).catch((r) => res.send(r))
})

router.get('/AddUser', function(req: Request<unknown, unknown, unknown, AddUserParams>, res: Response) {
  const query = req.query
  addUser(query.name, query.phone, query.email, query.affiliation, query.password).then(r => {
    res.send(r)
  }).catch((r) => res.send(r.body))
})

router.get('/FindUser', function(req: Request<unknown, unknown, unknown, FindUserParams>, res: Response) {
  const query = req.query
  findUser(query.email, query.password).then(r => {
    res.send(r.data.results.bindings)
  }).catch(r => res.send(r))
})

router.get('/AddCategories', function(req: Request<unknown, unknown, unknown, AddCategoriesParams>, res: Response) {
  const query = req.query
  addCategories(query.specProblem, query.dataProduct, query.accessibleData, query.nodeName).then(r => {
    res.send(r)
  }).catch(r => res.send(r))
})

router.get('/SetAdmin', function(req: Request<unknown, unknown, unknown, SetAdminParams>, res: Response) {
  const query = req.query
  setAdmin(query.email, query.setAdmin.toLowerCase() === 'true').then(r => {
    res.send(r)
  }).catch(r => res.send(r))
})

router.get('/Subscribe', function(req: Request<unknown, unknown, unknown, SubscribeParams>, res: Response) {
  const query = req.query
  subscribe(query.email, query.ODAProblem).then(r => {
    res.send(r)
  }).catch(r => res.send(r))
})

router.get('/Unsubscribe', function(req: Request<unknown, unknown, unknown, SubscribeParams>, res: Response) {
  const query = req.query
  unsubscribe(query.email, query.ODAProblem).then(r => {
    res.send(r)
  }).catch(r => res.send(r))
})

export default router
