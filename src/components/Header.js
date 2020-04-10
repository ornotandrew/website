import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'

export default function ({ isRootPath, title }) {
  const simpleChildLink = `a {
    box-shadow: none;
    text-decoration: none;
    color: inherit;
  }`
  const Container = isRootPath
    ? styled.h1`
        ${scale(1.5)}
        margin-bottom: ${rhythm(1.5)};
        margin-top: 0;
        ${simpleChildLink}
    `
    : styled.h3`
        font-family: Montserrat, sans-serif;
        margin-top: 0;
        ${simpleChildLink}
    ` // TODO: fix hardcoded font-family
  return (
    <header>
      <Container>
        <Link to={`/`} >{title}</Link>
      </Container>
    </header>
  )
}
