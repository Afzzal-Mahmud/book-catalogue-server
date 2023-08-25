/* step one --> create book interface*/
export type IBook = {
  title: string
  author: string
  genre: string
  publicationYear: number
  details: string
  price: number
  image: string
  review?: []
}
