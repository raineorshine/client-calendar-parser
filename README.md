Parses events from an ical file and outputs a simple csv log.

Move `sample-secure.json` to `secure.json` and update with valid event summaries.

## Usage

    # parse and display total number of matched events
    node index.js mycalendar.ical sample

    # generate simple csv log of all events
    node index.js mycalendar.ical
