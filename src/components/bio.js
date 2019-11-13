import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import ImageLink from './imageLink'
import twitter from '../svg/twitter.svg'

import { rhythm } from '../utils/typography'

const Bio = () => {
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
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by {' '}
        <ImageLink
          alt={`${author} twitter`}
          href={`https://twitter.com/${social.twitter}`}
          src={twitter}
          style={{
            boxShadow: 'none',
            marginRight: '-0.1em',
            marginLeft: '-0.1em',
            lineHeight: rhythm(),
            marginTop: '0.2em'
          }}
        />
        <strong>{author}</strong>
        , a software engineer in Cape Town, South Africa
      </p>
    </div>
  )
}

export default Bio
