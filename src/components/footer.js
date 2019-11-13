import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ImageLink from './imageLink'
import gatsby from '../svg/gatsby.svg'
import github from '../svg/github.svg'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <footer>
      © {new Date().getFullYear()} {author}
      <br/>
      Built with
      {' '}<ImageLink alt={'Gatsby'} href={'https://www.gatsbyjs.org'} src={gatsby}/>
      {' '}<ImageLink alt={'GitHub Pages'} href={'https://pages.github.com/'} src={github}/>
    </footer>
  )
}

export default Footer
