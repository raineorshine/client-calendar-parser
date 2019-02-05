Parses client sessions from an ical file and outputs a simple csv log.

Move `sample-secure.json` to `secure.json` and enter individual clients to match the title of the event. Otherwise matches 'Therapy with Raine Revere' (can be changed in source).

## Usage

    # parse and display total number of sessions
    node index.js mycalendar.ical sample

    # generate simple csv log of all client sessions
    node index.js mycalendar.ical
