import { type Request, type Response, Router } from 'express'
import {
  type AddUserParams,
  type FindUserParams,
  type SetAdminParams,
  type SubscribeParams,
} from '../interfaces/interfaces'

import { convertUser } from '../utils/convertData'
import {
  addUser,
  findUser,
  getUser,
  isSubbed,
  setAdmin,
  subscribe,
  unsubscribe,
} from '../database/api/user'

export const router = Router()

router.get(
  '/AddUser',
  function (
    req: Request<unknown, unknown, unknown, AddUserParams>,
    res: Response
  ) {
    const query = req.query
    console.log(query)
    console.log('ontology.ts: adding user')
    addUser(
      query.phone,
      query.email,
      query.affiliation,
      query.password,
      query.admin
    )
      .then((r) => {
        res.send(r)
      })
      .catch((r) => res.send(r))
  }
)

router.get(
  '/FindUser',
  function (
    req: Request<unknown, unknown, unknown, FindUserParams>,
    res: Response
  ) {
    const query = req.query

    findUser(query.email, query.password)
      .then((r) => {
        if (r.data.results.bindings.toString().length > 0) {
          res.send(true)
        } else {
          res.send(false)
        }
      })
      .catch(() => res.send(false))
  }
)

router.get(
  '/SetAdmin',
  function (
    req: Request<unknown, unknown, unknown, SetAdminParams>,
    res: Response
  ) {
    const query = req.query
    setAdmin(query.email, query.setAdmin.toLowerCase() === 'true')
      .then((r) => {
        res.send(r)
      })
      .catch((r) => res.send(r))
  }
)

router.get(
  '/IsSubscribed',
  function (
    req: Request<unknown, unknown, unknown, SubscribeParams>,
    res: Response
  ) {
    const { email, ODAProblem } = req.query
    isSubbed(email, ODAProblem)
      .then((r) => {
        console.log(r.data.results.bindings)
        if (r.data.results.bindings.toString().length > 0) {
          res.send(true)
        } else {
          res.send(false)
        }
      })
      .catch(() => res.send(false))
  }
)

router.get(
  '/UserInfo',
  function (
    req: Request<unknown, unknown, unknown, FindUserParams>,
    res: Response
  ) {
    const { email } = req.query
    getUser(email)
      .then((r) => {
        res.send(convertUser(r))
      })
      .catch((r) => res.send(r))
  }
)

router.get(
  '/Subscribe',
  function (
    req: Request<unknown, unknown, unknown, SubscribeParams>,
    res: Response
  ) {
    const query = req.query
    subscribe(query.email, query.ODAProblem)
      .then((r) => {
        res.send(r)
      })
      .catch((r) => res.send(r))
  }
)

router.get(
  '/Unsubscribe',
  function (
    req: Request<unknown, unknown, unknown, SubscribeParams>,
    res: Response
  ) {
    const query = req.query
    unsubscribe(query.email, query.ODAProblem)
      .then((r) => {
        res.send(r)
      })
      .catch((r) => res.send(r))
  }
)
