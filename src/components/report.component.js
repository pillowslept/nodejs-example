import Pdfkit from 'pdfkit'
import { ACTIVE, ACTIVE_TEXT, INACTIVE_TEXT } from 'constants/states.constant'
import * as reportUtils from 'utils/reports.util'
import * as datesUtils from 'utils/dates.util'

export const byMovie = (movie) => {
  const doc = new Pdfkit({ margin: 50 })

  reportUtils.header(doc, 'Movies report')

  const state = movie.state === ACTIVE ? ACTIVE_TEXT : INACTIVE_TEXT
  buildSummary(doc, movie, state)

  buildTable(doc, 'Genres', movie.genres)

  reportUtils.footer(doc, 'Generated using PdfKit.')

  return doc
}

export const byGenre = (genre, movies) => {
  const doc = new Pdfkit({ margin: 50 })

  reportUtils.header(doc, 'Genres report')

  buildSummary(doc, genre, '--')

  buildTable(doc, 'Movies', movies)

  reportUtils.footer(doc, 'Generated using PdfKit.')

  return doc
}

const buildTable = (doc, title, array) => {
  reportUtils.subTitle(doc, title, 300, 'left')
  reportUtils.separator(doc, 320)

  let tableTop = 350

  reportUtils.fourColumnsRow(
    doc,
    tableTop,
    reportUtils.BOLD_FONT,
    'ID',
    'Name',
    'Created at',
    'Updated at'
  )

  reportUtils.separator(doc, tableTop + 20)

  let lastPosition = 0
  array.forEach(({ id, name, createdAt, updatedAt }, index) => {
    const position = tableTop + (index + 1) * 30
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

  reportUtils.subTitle(doc, `Total: ${array.length}`, lastPosition + 10, 'right')
}

const buildSummary = (doc, summary, state) => {
  reportUtils.title(doc, summary.name, 160)
  reportUtils.separator(doc, 185)

  const summaryTopPosition = 200

  doc
    .fontSize(10)
    .font(reportUtils.BOLD_FONT)
    .text('ID:', 50, summaryTopPosition)
    .font(reportUtils.FONT)
    .text(summary.id, 130, summaryTopPosition)
    .font(reportUtils.BOLD_FONT)
    .text('Creation date:', 50, summaryTopPosition + 15)
    .font(reportUtils.FONT)
    .text(datesUtils.buildDate(summary.createdAt), 130, summaryTopPosition + 15)
    .font(reportUtils.BOLD_FONT)
    .text('Updated date:', 50, summaryTopPosition + 30)
    .font(reportUtils.FONT)
    .text(datesUtils.buildDate(summary.updatedAt), 130, summaryTopPosition + 30)
    .font(reportUtils.BOLD_FONT)
    .text('State:', 50, summaryTopPosition + 45)
    .font(reportUtils.FONT)
    .text(state, 130, summaryTopPosition + 45)
    .moveDown()

  reportUtils.separator(doc, 265)
}
