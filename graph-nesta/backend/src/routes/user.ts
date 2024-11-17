import { type Request, type Response, Router } from 'express'
import {
  type FindUserParams,
  type SubscribeParams,
} from '../interfaces/interfaces.ts'

import { convertUser } from '../utils/convertData.ts'
import {
  addUser,
  findUser,
  getUser,
  isSubbed,
  setAdmin,
  subscribe,
  unsubscribe,
} from '../database/api/user.ts'

export const router = Router()

router.post(
  '/AddUser',
  function (
    req: Request,
    res: Response
  ) {
    const data = req.body
    addUser(
      data.phone,
      data.email,
      data.affiliation,
      data.password,
      data.admin
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
    const { email, password } = req.query
    findUser(email, password)
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

router.put(
  '/SetAdmin',
  function (
    req: Request,
    res: Response
  ) {
    const data = req.body
    setAdmin(data.email, data.setAdmin.toLowerCase() === 'true')
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
