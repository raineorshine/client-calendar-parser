const ical = require('ical')
const { summaryMatches } = require('./secure.json')

const file = process.argv[2]
const command = process.argv[3]

const limit = 0

/**********************************************************
 * HELPER FUNCTIONS
 **********************************************************/

// matching condition
const match = ev => {
  return ev.type === 'VEVENT' &&
    summaryMatches.includes(ev.summary.replace(/\xa0/g, ' ')) // replace non-breaking space
}

const isCouples = ev => ev.summary.replace(/\xa0/g, ' ') === 'Couples Therapy with Raine Revere'

// replace "," so that the value is recognized as a DateTime in GoogleSheets
const eventToCsv = ev => `"${ev.start.toLocaleString().replace(',', '')}","${isCouples(ev) ? 'Couples Counseling' : 'Individual Counseling'}"`

/**********************************************************
 * MAIN
 **********************************************************/

if (!file) {
  console.error('Please enter filename.')
  process.exit(1)
}

// parse client events
const cal = ical.parseFile(file)

// filter summaryMatches events
const sessions = Object.keys(cal)
  .map(k => cal[k])
  .filter(match)
  .slice(0, limit || undefined)

// SUMMARY
if (command === 'summary') {
  console.log(`${sessions.length} sessions`)
}
// CSV (default)
else {

  // header
  console.log('"Date","Session Type"')

  for (let i=0; i<sessions.length; i++) {
    const ev = sessions[i]

    // output event
    console.log(eventToCsv(ev))

    // output recurrences
    if (ev.recurrences && ev.recurrences) {
      for (let k in ev.recurrences) {
        const rec = ev.recurrences[k]
        console.log(eventToCsv(rec))
      }
    }
  }
}
