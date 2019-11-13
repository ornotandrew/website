import React from 'react'

export default ({
  alt,
  href,
  src,
  style
}) => (
  <a
    href={href}
    style={{
      boxShadow: `none`,
      textDecoration: `none`,
      color: `inherit`,
      verticalAlign: 'middle',
      ...style
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
      <img
        alt={alt}
        src={src}
        style={{
          height: '1em',
          margin: 0
        }}
      />
  </a>
)
