const fs = require('fs')
class Config {
    constructor(dest) {
        this.file = ".config.json"
        this.dest = dest
        this.filePath = `${dest}/${this.file}`
        this.configInit = {
            store: this.filePath,
            links: {}
        }
    }

    create(){
        try {
            fs.lstatSync(this.filePath).isFile() 
            return 'config exist'
        } catch(err){
            err.code === "ENOENT" &&
                fs.writeFileSync(this.filePath, JSON.stringify(this.configInit))
            return 'config created'
        }


    }
}
module.exports = Config
