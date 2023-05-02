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

export const GET_PAGE = (locale: string, id: number) => gql`
  query PageBySlug {
    page(locale: "${locale}", id: ${id}) {
      data {
        id
        attributes {
          slug
          title
        }
      }
    }
  }
`;

export const GET_SKILLS = (locale: string) => gql`
  query Skills {
    skills(locale: "${locale}") {
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
`;

export const GET_TECHNOLOGY = (locale: string) => gql`
  query Technologies {
    technology(locale: "${locale}") {
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
`;

export const GET_EXPERIENCE = (locale: string) => gql`
  query Experience {
    experience(locale: "${locale}") {
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
`;

export const GET_PORTFOLIO = (locale: string) => gql`
  query Portfolio {
    portfolio(locale: "${locale}") {
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
`;

export const GET_CONTACT = (locale: string) => gql`
  query Contact {
    contact(locale: "${locale}") {
      data {
        id
        attributes {
          content
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
          content
          pictures {
            title
            imageUrl
          }
        }
      }
    }
  }
`;
