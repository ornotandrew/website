import React from 'react'

import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Header from './Header'
import Footer from './Footer'

// Simple constraints on the entire container
const IndexWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  max-width: ${rhythm(24)};
`

// Within a post, we want to give different padding and margins to different
// elements. This allows a medium-like column layout where images can be wider
// than the text.
const PostWrapper = styled.div`
  // Left/right padding is done on each element individually (below)
  padding: ${rhythm(1.5)} 0;

  // Images
  section>figure,
  section>img {
    max-width: 1000px;
  }
  
  // Catch-all column styles
  >header>*,
  article>header>*,
  section>*,
  footer,
  main>nav,
  section>figure>figcaption {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 0 ${rhythm(3 / 4)};
    max-width: ${rhythm(24)};
  }

  // Extra padding to indent lists
  article>section>ul, article>section>ol {
    padding-left: ${rhythm(3 / 4 + 1)};
  }
`

export default function ({ location, title, children }) {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`
  const Wrapper = isRootPath ? IndexWrapper : PostWrapper
  return (
    <Wrapper>
      <Header title={title} isRootPath={isRootPath}/>
      <main>{children}</main>
      <Footer/>
    </Wrapper>
  )
}
