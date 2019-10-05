import Pdfkit from 'pdfkit'
import { ACTIVE, ACTIVE_TEXT, INACTIVE_TEXT } from 'constants/states.constant'
import * as reportUtils from 'utils/reports.util'
import * as datesUtils from 'utils/dates.util'

export const byMovie = (movie) => {
  const doc = new Pdfkit({ margin: 50 })

  reportUtils.header(doc, 'Movies report')
  reportUtils.separator(doc, 110)

  // summary
  reportUtils.title(doc, movie.name, 160)
  reportUtils.separator(doc, 185)

  const summaryTopPosition = 200
  const state = movie.state === ACTIVE ? ACTIVE_TEXT : INACTIVE_TEXT

  doc
    .fontSize(10)
    .font(reportUtils.BOLD_FONT)
    .text('ID:', 50, summaryTopPosition)
    .font(reportUtils.FONT)
    .text(movie.id, 130, summaryTopPosition)
    .font(reportUtils.BOLD_FONT)
    .text('Creation date:', 50, summaryTopPosition + 15)
    .font(reportUtils.FONT)
    .text(datesUtils.buildDate(movie.createdAt), 130, summaryTopPosition + 15)
    .font(reportUtils.BOLD_FONT)
    .text('Updated date:', 50, summaryTopPosition + 30)
    .font(reportUtils.FONT)
    .text(datesUtils.buildDate(movie.updatedAt), 130, summaryTopPosition + 30)
    .font(reportUtils.BOLD_FONT)
    .text('State:', 50, summaryTopPosition + 45)
    .font(reportUtils.FONT)
    .text(state, 130, summaryTopPosition + 45)
    .moveDown()

  reportUtils.separator(doc, 265)

  // summary table
  reportUtils.subTitle(doc, 'Genres', 300, 'left')
  reportUtils.separator(doc, 320)

  let genresTableTop = 350

  reportUtils.fourColumnsRow(
    doc,
    genresTableTop,
    reportUtils.BOLD_FONT,
    'ID',
    'Name',
    'Created at',
    'Updated at'
  )

  reportUtils.separator(doc, genresTableTop + 20)

  let lastPosition = 0
  movie.genres.forEach(({ id, name, createdAt, updatedAt }, index) => {
    const position = genresTableTop + (index + 1) * 30
    reportUtils.fourColumnsRow(
      doc,
      position,
      reportUtils.FONT,
      id,
      name,
      datesUtils.buildDate(createdAt),
      datesUtils.buildDate(updatedAt)
    )

    lastPosition = position + 20
    reportUtils.separator(doc, lastPosition)
  })

  reportUtils.subTitle(doc, `Total: ${movie.genres.length}`, lastPosition + 10, 'right')

  reportUtils.footer(doc, 'Generated using PdfKit.')

  return doc
}
