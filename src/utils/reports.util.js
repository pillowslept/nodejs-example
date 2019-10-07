import * as datesUtils from './dates.util'

export const BOLD_FONT = 'Helvetica-Bold'
export const FONT = 'Helvetica'
export const FONT_COLOR = '#444444'

export const header = (doc, name) => {
  doc
    .image('images/logo.jpg', 50, 45, { width: 50 })
    .fillColor(FONT_COLOR)
    .fontSize(20)
    .text(name, 110, 57)
    .fontSize(10)
    .text('Juan Camilo V.', 200, 50, { align: 'right' })
    .text(datesUtils.actualDate(), 200, 65, { align: 'right' })
    .text('Antioquia, Medellín, 050022', 200, 80, { align: 'right' })
    .moveDown()

  separator(doc, 110)
}

export const title = (doc, text, yPosition) => {
  doc
    .fillColor(FONT_COLOR)
    .fontSize(20)
    .text(text, 50, yPosition)
}

export const subTitle = (doc, text, yPosition, align) => {
  doc
    .fillColor(FONT_COLOR)
    .fontSize(14)
    .text(text, 50, yPosition, { align })
}

export const fourColumnsRow = (
  doc,
  y,
  font,
  id,
  name,
  createdAt,
  updatedAt) => {
  doc
    .font(font)
    .fontSize(10)
    .text(id, 60, y)
    .text(name, 120, y)
    .text(createdAt, 290, y, { width: 130 })
    .text(updatedAt, 430, y)
}

export const separator = (doc, yPosition) => {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, yPosition)
    .lineTo(565, yPosition)
    .stroke()
}

export const footer = (doc, text) => {
  doc
    .fontSize(10)
    .text(
      text,
      50,
      720,
      { align: 'right', width: 500 }
    )
}
