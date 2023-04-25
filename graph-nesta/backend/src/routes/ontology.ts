import { type Request, type Response, Router } from 'express'
import * as fs from "fs";
import {
  addCategories,
  addODAProblem,
  addUser, findUser, getCategories,
  getODAProblems, getSubscribers, getUser, isSubbed,
  setAdmin,
  subscribe,
  unsubscribe,
} from '../database/ontology'
import {
  type AddCategoriesParams,
  type AddOdaProblemParams,
  type AddUserParams, type CategoryParams,
  type FindUserParams,
  type OdaProblemParams,
  type SetAdminParams,
  type SubscribeParams,
} from '../interfaces/interfaces'
import { convertCategory, convertSubscribers, convertUser, setObject } from '../middleware/convertData'
import axios from 'axios'

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
  const {limit, offset, searchString, category, email, relation, approved, similarProblem} = req.query
  getODAProblems(limit, offset, searchString, category, email, relation, approved, similarProblem).then(r => {
    res.send(setObject(r))
  }).catch(() => res.send([]))
})

router.get('/AddProblem', function(req: Request<unknown, unknown, unknown, AddOdaProblemParams>, res: Response) {
  const query = req.query
  addODAProblem(query.title, query.specificProblem, query.clearDataProduct, query.accessibleData, query.definedAction, query.supplier, query.userMail, query.status).then(r => {
    res.send(r.request)
  }).catch((r) => res.send(r.request))
})

router.get('/NestaGuide', function(_, res: Response) {
  const path = "./public/NestaGuide.pdf";
  if (fs.existsSync(path)) {
    res.contentType("application/pdf");
    fs.createReadStream(path).pipe(res);
  } else {
    res.status(500);
    console.log("File not found");
    res.send("File not found")
  }
})

router.get('/AddUser', function(req: Request<unknown, unknown, unknown, AddUserParams>, res: Response) {
  const query = req.query
  console.log(query)
  console.log("ontology.ts: adding user")
  addUser(query.phone, query.email, query.affiliation, query.password, query.admin).then(r => {
    res.send(r)
  }).catch((r) => res.send(r))
})

router.get('/FindUser', function(req: Request<unknown, unknown, unknown, FindUserParams>, res: Response) {
  const query = req.query

  findUser(query.email, query.password).then(r => {
    if (r.data.results.bindings.toString().length > 0) {
      res.send(true)
    } else {res.send(false)}
  }).catch(() => res.send(false) )
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

router.get('/UserInfo', function(req: Request<unknown, unknown, unknown, FindUserParams>, res: Response) {
  const {email} = req.query
  getUser(email).then(r => {
    res.send(convertUser(r))
  }).catch(r => res.send(r))
})

router.get("/IsSubscribed", function(req: Request<unknown, unknown, unknown, SubscribeParams>, res: Response) {
  const {email, ODAProblem} = req.query
  isSubbed(email, ODAProblem).then(r => {
    console.log(r.data.results.bindings)
    if (r.data.results.bindings.toString().length > 0) {
      res.send(true)
    } else {
      res.send(false)
    }
  }).catch(() => res.send(false))
})

router.get("/GetSubscribers", function(req: Request<unknown, unknown, unknown, SubscribeParams>, res: Response) {
  const {ODAProblem} = req.query
  getSubscribers(ODAProblem).then(r => {
    res.send(convertSubscribers(r))
  }).catch(() => res.send([]))
})

router.get("/GetCategories", function(req: Request, res: Response) {
  getCategories().then(axios.spread((...r) => {
    const categories: CategoryParams = {
      specificProblem: convertCategory(r[0]),
      accessibleData: convertCategory(r[1]),
      dataProduct: convertCategory(r[2])
    }
    res.send(categories)
  })).catch(() => res.send("error"))

})

export default router
