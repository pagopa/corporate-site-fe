import React from "react"

import Cta from "../Cta/Cta"
import "./Text.sass"

const Text = ({ data, classes, locale }) => {
  const { template, content } = data

  const columns = template === "outdented" ? "col-lg-6" : "col-lg-8 offset-lg-2"

  const { eyelet, title, text, note, link } = content

  return (
    <section className={`block --${classes} text --${template}`}>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 col-md-10 offset-md-1 ${columns}`}>
            {eyelet && <h4>{eyelet}</h4>}
            {title ? (
              template === "centered" ? (
                <h2>{title}</h2>
              ) : (
                <h1>{title}</h1>
              )
            ) : (
              false
            )}
            {text && (
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
            {note && (note.noteTitle || note.noteText) && (
              <div className="text-note">
                <h4>{note.noteTitle}</h4>
                <div dangerouslySetInnerHTML={{ __html: note.noteText }} />
              </div>
            )}
            {link && (
              <Cta
                label={link.title}
                url={link.url}
                blank={link.target}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Text
