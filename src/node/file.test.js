const File = require('./file.js')
const mock = require('mock-fs')
let file


// file.move
// file.createSymlink(file, dest)
// file.isSymbolicLink

describe('File should  by a link ^^', () => {
    mock({
        'symlink': mock.symlink({ path: 'file'}),
    })
    file = new File('symlink', 'STORE')
    expect(file.isSymbolicLink).toBe('true')
    mock.restore()
})

