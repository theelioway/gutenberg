export const Thing = async function Thing(thing) {
  const mainEntityOfPage = "Thing"
  thing.mainEntityOfPage = thing.mainEntityOfPage || mainEntityOfPage
  thing.identifier = thing.identifier || thing.mainEntityOfPage.toLowerCase()
  return thing
}

export const Book = async function Book(thing) {
  const mainEntityOfPage = "Book"
  return await Thing({ thing, mainEntityOfPage })
}

export default Book
