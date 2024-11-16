import { gql } from "@apollo/client/core";

export const GET_PAGES = (locale: string) => gql`
  query Pages {
    pages(locale: "${locale}") {
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
`;

export const GET_PAGE = (locale: string, slug: string) => gql`
  query PageBySlug {
    page(locale: "${locale}", slug: "${slug}") {
      data {
        id
        attributes {
          title
          content
          updatedAt
        }
      }
    }
  }
`;

export const GET_POSTS = () => gql`
  query Posts {
    posts {
      data {
        id
        attributes {
          Post {
            title
            date
            lead
            imageUrl
            link
          }
        }
      }
    }
  }
`;

export const GET_SKILLS = () => gql`
  query Skills {
    skills {
      data {
        id
        attributes {
          sets {
            name
            value
            techs {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_EXPERIENCE = (locale: string) => gql`
  query Experience {
    experience(locale: "${locale}") {
      data {
        id
        attributes {
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
`;

export const GET_PORTFOLIO = (locale: string) => gql`
  query Portfolio {
    portfolio(locale: "${locale}") {
      data {
        id
        attributes {
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
`;

export const GET_INSPIRATION = (locale: string) => gql`
  query Inspiration {
    inspiration(locale: "${locale}") {
      data {
        id
        attributes {
          pictures {
            title
            imageUrl
          }
        }
      }
    }
  }
`;
