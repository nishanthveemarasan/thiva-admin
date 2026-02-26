import React from 'react'
const Pagination = ({ to, total, links, change }) => {
  const pageChangeHandler = (url) => {
    change(url)
  }
  return (
    <nav className="d-flex justify-content-end">
      <div className="align-self-center mr-3 font-weight-bold">
        <span>{`${to} of ${total}`}</span>
      </div>
      <ul className="pagination">
        {links &&
          links.map((link, i) => {
            return (
              <li key={i} className={`page-item ${link.active && 'active'}`}>
                {i === 0 && (
                  <span className="page-link" onClick={pageChangeHandler.bind(null, link.page)}>
                    &laquo;
                  </span>
                )}
                {i === links.length - 1 && (
                  <span className="page-link" onClick={pageChangeHandler.bind(null, link.page)}>
                    &raquo;
                  </span>
                )}
                {i !== 0 && i !== links.length - 1 && (
                  <span className="page-link" onClick={pageChangeHandler.bind(null, link.page)}>
                    {link.label}
                  </span>
                )}
              </li>
            )
          })}
      </ul>
    </nav>
  )
}
export default React.memo(Pagination)
