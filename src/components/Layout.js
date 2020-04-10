import React from 'react'

import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Header from './Header'
import Footer from './Footer'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

export default function ({ location, title, children }) {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`
  return (
    <Wrapper>
      <Header title={title} isRootPath={isRootPath}/>
      <main>{children}</main>
      <Footer/>
    </Wrapper>
  )
}
