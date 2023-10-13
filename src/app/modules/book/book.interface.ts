/* step one --> create book interface*/
export type IBook = {
  title: string
  author: string
  genre: string
  publicationYear: string
  details: string
  price: string
  image: string
  reference?: string
  bookmark?: boolean
  review?: []
}
