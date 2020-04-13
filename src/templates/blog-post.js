import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'

const Title = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`

const Date = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-bottom: ${rhythm(1)};
`

const Footer = styled.footer`
  hr {
    margin-bottom: ${rhythm(1)}    
  }
`

const BottomNav = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const { excerpt, frontmatter, html } = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={frontmatter.title}
          description={excerpt}
        />
        <article>
          <header>
            <Title>{frontmatter.title}</Title>
            <Date>{frontmatter.date}</Date>
          </header>
          {frontmatter.banner && <img src={frontmatter.banner.publicURL}/>}
          <section dangerouslySetInnerHTML={{ __html: html }} />
          <Footer>
            <hr />
            <Bio />
          </Footer>
        </article>

        <BottomNav>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </BottomNav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        banner { publicURL }
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
