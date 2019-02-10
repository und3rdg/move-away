const File = require('./file.js')
const Config = require('./config.js')


const HOME = process.env['HOME']

const FILE = `${HOME}/tmp/move-away/file`
const STORE = `${HOME}/tmp/move-away/STORE`


const file = new File(FILE, STORE)
const cfg = new Config(STORE)

    // file.move()
let out = [
    // file.playground,
    // file.move(),
    cfg.create(),
]

out.map( item => console.log( JSON.stringify(item, null, 4) ) )


