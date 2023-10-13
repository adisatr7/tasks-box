export type User = {
  id?: string
  email: string
  firstName: string
  lastName: string
  position?: string
  imageUrl: string
  level: number
  exp: number
}

export type UsersQuery = {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: User[]
}

export type InvolvedUser = User & {
  isCompleted: boolean
  completedAt: string
}

export type Task = {
  id: string
  title: string
  madeBy: User
  description: string
  isCompleted: boolean
  createdAt: string
  deadline?: string
  updatedAt?: string
  completedAt?: string
  involved: InvolvedUser[]
}

export type SvgIcon = {
  width?: number
  height?: number
  fill?: string
}