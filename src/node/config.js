const fs = require('fs')
class Config {
    constructor(dest) {
        this.file = ".config.json"
        this.dest = dest
        this.configPath = `${dest}/${this.file}`
        this.configInit = {
            store: this.configPath,
            links: []
        }
    }


    create(){
        try {
            fs.lstatSync(this.configPath).isFile() 
            return 'config exist'
        } catch(err){
            err.code === "ENOENT" &&
                fs.writeFileSync(this.configPath, JSON.stringify(this.configInit))
            return 'config created'
        }
    }


    read(){
        try{
            return JSON.parse(fs.readFileSync(this.configPath, 'utf-8'))
        } catch(err){
            return err
        }
    }


    write(filePath, linkPath){
        let cfg = { ...this.read() }

        cfg = {
            ...cfg,
            links: [
                ...cfg.links,
                {
                    file: filePath,
                    link: linkPath,
                }
            ]
        }

        const cfgString = JSON.stringify(cfg)

        try{
            fs.writeFileSync(this.configPath, cfgString)
            return cfgString
        }catch(err){
            return err
        }


        
    }
}
module.exports = Config
