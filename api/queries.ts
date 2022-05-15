import {
  gql
} from "@apollo/client/core"

export const GET_ALL_PAGES = gql`
query AllPages {
  pages {
    data {
      id
      attributes {
        slug
        title
      }
    }
  }
}
`

export const GET_PAGE = (id: number) => {
  return gql`
  query PageBySlug {
    page(id: ${id}) {
      data {
        id
        attributes {
          slug
          title
          content
        }
      }
    }
  }
  `
}
