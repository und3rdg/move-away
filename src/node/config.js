class Config {
    constructor(file, dest) {
        this.file = file
        this.dest = dest
        this.filePath = `${dest}/${file}`
    }

}
module.exports = Config
