const fs = require('fs')
const path = require('path')

class File {
    constructor(file, dest){
        this.file     = file
        this.fileName = path.basename(this.file)
        this.fileDir  = path.dirname(this.file)
        this.filePath = `${this.fileDir}/${this.fileName}`
        this.dest     = dest
    }


    get isSymbolicLink() {
        try {
            fs.lstatSync(this.filePath).isSymbolicLink()
                return fs.readlinkSync(this.filePath)
        } catch(err) {
            const out = err.code === "EINVAL"
                ? false
                : err.code 
            return out
        }
    }


    move(){
        try {
            const isLink = this.isSymbolicLink
            let file = !isLink
                ? this.filePath
                : fs.readlinkSync(this.filePath)
            let dest = !isLink
                ? `${this.dest}/${this.fileName}`
                : this.filePath

            this.unlinkDest(dest)
            fs.renameSync(file, dest)
            this.createSymlink(dest, file)
            return {file: file, dest: dest}
        } catch(err) { return err }
    }


    createSymlink(file, dest) {
        try {
            fs.symlinkSync(file, dest) 
            return [file, dest]
        } catch(err) { return err }
    }

    unlinkDest(dest){
        try{
            fs.unlinkSync(dest)
        } catch(err) { return err }
    }

    get playground() {
        try {
            return {
                file     : this.file,
                fileName : this.fileName,
                fileDir  : this.fileDir,
                filepath : this.filePath,
                lstat    : fs.statSync(this.filePath),
            }
        } catch(err) { return err }
    }
}

module.exports = File

/** /
const HOME = process.env['HOME']

const FILE = `${HOME}/tmp/move-away/file`
const STORE = `${HOME}/tmp/move-away/STORE`


let file = new File(FILE, STORE)
    // file.move()
let out = [
    // file.playground,
    file.move(),
]

out.map( item => console.log( JSON.stringify(item, null, 4) ) )
/**/

// vim: tabstop=4 sw=4
