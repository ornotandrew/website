import React from 'react'
import styled from 'styled-components'

const A = styled.a`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  vertical-align: 'middle';
`

const Img = styled.img`
  height: 1em;
  margin: 0;
`

export default ({ alt, href, src, className }) => (
  <A
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Img alt={alt} src={src} />
  </A>
)
