import { type Request, type Response, Router } from 'express'
import {
  type AddCategoriesParams,
  type OdaProblemParams,
  type SubscribeParams,
} from '../interfaces/interfaces'

import { convertSubscribers, convertOdaProblem } from '../utils/convertData'
import {
  addCategories,
  addODAProblem,
  deleteODAProblem,
  getODAProblems,
  getSubscribers,
  updateODAProblem,
} from '../database/api/odaProblem'

export const router = Router()

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
router.get(
  '',
  function (
    req: Request<unknown, unknown, unknown, OdaProblemParams>,
    res: Response
  ) {
    const {
      limit,
      offset,
      searchString,
      category,
      email,
      relation,
      approved,
      similarProblem,
      filter,
    } = req.query
    getODAProblems(
      limit,
      offset,
      searchString,
      category,
      email,
      relation,
      approved,
      similarProblem,
      parseInt(filter)
    )
      .then((r) => {
        res.send(convertOdaProblem(r))
      })
      .catch(() => res.send([]))
  }
)

router.post('/AddProblem', function (req: Request, res: Response) {
  const data = req.body
  addODAProblem(
    data.title,
    data.specificProblem,
    data.clearDataProduct,
    data.accessibleData,
    data.definedAction,
    data.supplier,
    data.userMail,
    data.status
  )
    .then((r) => {
      res.send(r)
    })
    .catch((r) => res.send(r))
})

router.put('/DeleteOdaProblem', function (req: Request, res: Response) {
  const data = req.body
  deleteODAProblem(data.odaProblem)
    .then((r) => res.send(r))
    .catch((r) => res.send(r))
})

router.put('/UpdateOdaProblem', function (req: Request, res: Response) {
  const data = req.body
  updateODAProblem(
    data.odaProblem,
    data.vendor,
    data.progress,
    data.title,
    data.specificProblem,
    data.clearDataProduct,
    data.accessibleData,
    data.definedAction
  )
    .then((r) => res.send(r))
    .catch((r) => res.send(r))
})

router.get(
  '/AddCategories',
  function (
    req: Request<unknown, unknown, unknown, AddCategoriesParams>,
    res: Response
  ) {
    const { specProblem, dataProduct, accessibleData, id, approved } = req.query
    addCategories(specProblem, dataProduct, accessibleData, id, approved)
      .then((r) => {
        res.send(r)
      })
      .catch((r) => res.send(r))
  }
)

router.get(
  '/GetSubscribers',
  function (
    req: Request<unknown, unknown, unknown, SubscribeParams>,
    res: Response
  ) {
    const { ODAProblem } = req.query
    getSubscribers(ODAProblem)
      .then((r) => {
        res.send(convertSubscribers(r))
      })
      .catch(() => res.send([]))
  }
)
