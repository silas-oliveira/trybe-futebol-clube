import { NextFunction, Request, Response } from "express"

export const error = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details: d } = err as any
  console.log('errorName', err.name)

  switch (name) {
    case 'ValidationError':
      res.status(401).json({ message: d[0].message })
      break
    case 'NotFoundError':
      res.status(404).json({ message })
      break
    case 'ReferenceError':
      res.status(409).json({ message })
      break
    case 'EmailOrPasswordError':
      res.status(401).json({ message })
      break
    default:
      return res.status(401).json({ message })
  }

  next()

}