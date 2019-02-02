const fs = require('fs')

const STORE = "/tmp/move-away/STORE"

function getLinkPatch(file) {
  try {
    return fs.readlinkSync(file) 
  } catch(err) {
    console.log(err)
  }
}


function moveFile(file, dest = STORE){
  try {
    fs.renameSync(file, `${dest}/${file}`)
  } catch(err) {
    console.log(err)
  }
}


function createSymlink(file, dest = STORE) {
  try {
    fs.symlinkSync(file, `${dest}/${file}`) 
  } catch(err) {
    console.log(err)
  }
}

function isSymbolicLink(file) {
  try {
    return fs.lstatSync(file).isSymbolicLink()
  } catch(err) {
    console.log(err)
  }
}


function toggleLocation(target, dest = STORE){
  let file
  let symlink
  if(isSymbolicLink(target)){
    file = `${dest}/${target}`
    symlink = getLinkPatch(target)
    console.log('isLink')
  } else {
      file = target
      symlink = `${dest}/${target}`
    console.log('is NOT Link')
  }

  if( !fs.existsSync(file) ) {
    file = "MISSING_FILE"
    return
  }

  moveFile(file, symlink)

  return [symlink, file]

}



// createSymlink('movetest', 'store')

let out = (
  isSymbolicLink(`${STORE}/../link`)
  // toggleLocation('store/file')
  // toggleLocation('link')
)

console.log(out)
