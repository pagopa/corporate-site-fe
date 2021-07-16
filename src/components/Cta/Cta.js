import React from "react"

import { Link } from "gatsby"

import "./Cta.sass"

const Cta = ({ label, url, blank = false, variant = false, locale = "it" }) => {
  const isAbsolute = new RegExp("^(?:[a-z]+:)?//", "i")
  let urlParts,
    theUrl = ""

  if (isAbsolute.test(url)) {
    const urlObject = new URL(url)
    urlParts = urlObject.pathname.match(/[^/]+/g)
  } else {
    urlParts = url.match(/[^/]+/g)
  }

  theUrl = `/${locale}/${urlParts.slice(-1)[0]}`

  return (
    <>
      {blank && theUrl ? (
        <a
          href={theUrl}
          target="_blank"
          className={`cta${variant ? ` --${variant}` : ""}`}
          rel="noopene noreferrer"
        >
          <span>{label}</span>
        </a>
      ) : (
        <Link to={theUrl} className={`cta${variant ? ` --${variant}` : ""}`}>
          <span>{label}</span>
        </Link>
      )}
    </>
  )
}

export default Cta
