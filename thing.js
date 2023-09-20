import ConsumeAction from "./Thing/Action/ConsumeAction.js"

export const Book = thing =>
  new Object({
    ...thing,
    mainEntityOfPage: "Book",
  })

export const DoreThing = thing =>
  new Object({
    ...thing,
    image: "./star.png",
    url: "https://en.wikipedia.org/wiki/Gustave_Dor%C3%A9",
    ItemList: {
      itemListElement: [8800].map(
        async identifier =>
          await ConsumeAction({ Action: { object: Book({ identifier }) } }),
      ),
    },
  })

export default DoreThing
