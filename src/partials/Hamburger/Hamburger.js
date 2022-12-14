import React from 'react'

import 'partials/Hamburger/Hamburger.sass'

const Hamburger = ({ handler }) => {
  return (
    <>
      <button className="hamburger" onClick={handler}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  )
}

export default Hamburger
