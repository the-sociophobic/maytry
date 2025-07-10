import { Request, Response } from 'express'


export type RouteType = {
  type: 'GET' | 'POST'
  path: string
  fn: RouteFnType
}

export type RouteFnType = (
  request: Request,
  response: Response
) => Promise<void>
