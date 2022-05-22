import { gql } from '@apollo/client/core'

export const GET_PAGES = () => gql`
  query Pages {
    pages {
      data {
        id
        attributes {
          slug
          order
          title
        }
      }
    }
  }
`

export const GET_PAGE = (id: number) => gql`
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
  }`

export const GET_SKILLS = () => gql`
  query Skills {
    skills {
      data {
        id
        attributes {
          content
          sets {
            name
            value
          }
        }
      }
    }
  }
`

export const GET_TECHNOLOGY = () => gql`
  query Technologies {
    technology {
      data {
        id
        attributes {
          content
          items {
            name
          }
        }
      }
    }
  }
`

export const GET_EXPERIENCE = () => gql`
  query Experience {
    experience {
      data {
        id
        attributes {
          content
          workplaces {
            name
            position
            dateFrom
            dateTo
            order
            lessVisible
          }
        }
      }
    }
  }
`

export const GET_PORTFOLIO = () => gql`
  query Portfolio {
    portfolio {
      data {
        id
        attributes {
          content
          projects {
            name
            date
            description
            logoUrl
            imageUrl
            url
          }
        }
      }
    }
  }
`
