const ical = require('ical')
const { clients } = require('./secure.json')

const file = process.argv[2]
const command = process.argv[3]

const limit = 69

// matching condition
const match = ev => {
  // console.log("ev.summary", ev.summary)
  return ev.type === 'VEVENT' && ev.summary && ev.summary.length &&
  (
    clients.includes(ev.summary) ||
    ev.summary.includes('Therapy with Raine Revere')
  )
}

if (!file) {
  console.error('Please enter filename.')
  process.exit(1)
}

// parse client events
const cal = ical.parseFile(file)

// console.log(cal[Object.keys(cal)[10]])

// filter clients events
const sessions = Object.keys(cal)
  .map(k => cal[k])
  .filter(match)
  .slice(0, limit || null)

// output
// for (let i=0; i<sessions.length; i++) {
//   const ev = sessions[i]
//   // \n  ${ev.description.replace(/\n/g, '').slice(0, 70)}
//   console.log(`${ev.start.toLocaleString()}: ${ev.summary}`)
// }

if (command === 'sumary') {
  console.log(sessions.length)
}
else {
  console.log('Date,Session')
  for (let i=0; i<sessions.length; i++) {
    const ev = sessions[i]
    // \n  ${ev.description.replace(/\n/g, '').slice(0, 70)}
    console.log(`"${ev.start.toLocaleString()}","${ev.summary === 'Couples Therapy with Raine Revere' ? 'Couples Counseling' : 'Individual Counseling'}"`)
  }
}
