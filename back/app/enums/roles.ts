enum Roles {
  USER = 1,
  ADMIN = 2,
}

export type RoleKey = keyof typeof Roles

export default Roles
