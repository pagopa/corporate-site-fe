import React from 'react'
import { Link } from 'gatsby'

import './Pagination.sass'

const Pagination = ({ context, baseUri }) => {
  const { numberOfPages, humanPageNumber, locale } = context

  const pageUri = `/${locale}/${baseUri}`
  const isFirstPage = humanPageNumber === 1
  const isLastPage = humanPageNumber === numberOfPages
  let pages = []

  for (let index = 0; index < numberOfPages; index++) pages.push(index + 1)

  return (
    <>
      <nav className="pagination">
        {isFirstPage
          ? <button disabled className="pagination__nav --prev"><span>Precedente</span></button>
          : <Link to={`${pageUri}/${humanPageNumber - 1 === 1 ? '' : humanPageNumber - 1}`} className="pagination__nav --prev"><span>Precedente</span></Link>
        }
        <ul>
          {pages.map((page, key) => {
            const slug = `${page === 1 ? '' : page}`
            const currentPage = humanPageNumber === page
            return (
              <li key={key} className={`pagination__page${currentPage ? ' is-current' : ''}`}>
                {currentPage
                  ? <span><span>{page}</span></span>
                  : <Link to={`${pageUri}/${slug}`}><span>{page}</span></Link>
                }
              </li>
            )
          })}
        </ul>
        {isLastPage
          ? <button disabled className="pagination__nav --next"><span>Avanti</span></button>
          : <Link to={`${pageUri}/${humanPageNumber + 1}`} className="pagination__nav --next"><span>Avanti</span></Link>
        }
      </nav>
    </>
  )
}

export default Pagination
