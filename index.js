const ical = require('ical')
const { clients } = require('./secure.json')

const file = process.argv[2]
const command = process.argv[3]

const limit = 0

/**********************************************************
 * HELPER FUNCTIONS
 **********************************************************/

// matching condition
const match = ev => {
  return ev.type === 'VEVENT' &&
  clients.includes(ev.summary)
}

const isCouples = ev => ev.summary === 'Couples Therapy with Raine Revere'

/**********************************************************
 * MAIN
 **********************************************************/

if (!file) {
  console.error('Please enter filename.')
  process.exit(1)
}

// parse client events
const cal = ical.parseFile(file)

// filter clients events
const sessions = Object.keys(cal)
  .map(k => cal[k])
  .filter(match)
  .slice(0, limit || undefined)

const recurring = []

// SUMMARY
if (command === 'summary') {
  console.log(`${sessions.length} sessions`)
}
// CSV (default)
else {
  console.log('Date,Session')
  for (let i=0; i<sessions.length; i++) {
    const ev = sessions[i]
    // \n  ${ev.description.replace(/\n/g, '').slice(0, 70)}
    console.log(`"${ev.start.toLocaleString()}","${isCouples(ev) ? 'Couples Counseling' : 'Individual Counseling'}"`)
    // if (ev.rrule) { // && ev.rrule.options.dtstart !== ev.rrule.options.dtstart) {
    //   recurring.push(ev)
    //   console.log(ev.description.slice(0, 10))
    // }
    // console.log('')
  }
}

// console.log("recurring.length", recurring.length)
