import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from 'gatsby-image'
import ImageLink from './ImageLink'
import twitter from '../svg/twitter.svg'
import { rhythm } from '../utils/typography'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1.5)};
`

const Avatar = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50px;
  border-radius: 100%;
  img {
    border-radius: 50%;
  }
` // TODO: make sure the image replacement is correct here with the 50% inner border-radius

export default function () {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <Wrapper>
      <Avatar
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
      />
      <p>
        Written by {' '}
        <ImageLink
          alt={`${author} twitter`}
          href={`https://twitter.com/${social.twitter}`}
          src={twitter}
        />
        <strong>{author}</strong>
        , a software engineer in Cape Town, South Africa
      </p>
    </Wrapper>
  )
}
