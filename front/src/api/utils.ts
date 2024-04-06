export const makeUrl = (url: string) => {
  return `${import.meta.env.VITE_BACKEND_HOST}/${url}`
}
