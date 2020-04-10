import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import ImageLink from './ImageLink'
import gatsby from '../svg/gatsby.svg'
import github from '../svg/github.svg'

const Footer = styled.footer`
`

export default function () {
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
    <Footer>
      © {new Date().getFullYear()} {author}
      <br/>
      Built with
      {' '}<ImageLink alt={'Gatsby'} href={'https://www.gatsbyjs.org'} src={gatsby}/>
      {' '}<ImageLink alt={'GitHub Pages'} href={'https://pages.github.com/'} src={github}/>
    </Footer>
  )
}
