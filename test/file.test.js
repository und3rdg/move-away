/* global before, after */
const expect = require('chai').expect

const File = require("./../src/node/file.js")
const fs = require("fs")
const mock = require("mock-fs")

describe("node/file.js", ()=>{

    describe("A: Creating and checking symlinks.", ()=>{
        before(() => {
            mock({
                "A":{
                    "symlink": mock.symlink({ path: "link/to/file"}),
                    "file": "file content",
                    "STORE": {}
                }
            })
        })
        after(mock.restore)

        const x = `./A`
        const file = `${x}/file`
        const dest = `${x}/STORE`
        const f = new File(file, dest)

        it("It create symlink.", () => {
            expect(f.createSymlink(`${file}`, `${dest}/newSymlink`)).eql([`${file}`, `${dest}/newSymlink`])
            expect(fs.readlinkSync(`${dest}/newSymlink`)).eq( `${file}` )
        })

        it(`It should by recognized as NOT symlink`, () => {
            expect(f.isSymbolicLink).eq(false)
        })

        it(`It should  by recognized as symlink`, () => {
            const file2 = `${x}/symlink`
            const f2 = new File(file2, dest)
            expect(f2.isSymbolicLink).eq(`link/to/file`)
        })
    })



    function moveTest(x, file, dest, f) {
        it("Move file and create symlink", () => {
            expect(f.move()).eql({"dest": `${dest}/file`, "file": `${file}`})
            expect(fs.existsSync(`${dest}/file`)).eq(true)
            expect(fs.readlinkSync(`${file}`)).eq( `${dest}/file` )
        })

        it("Reverse move file back and create symlink", () => {
            expect(f.move()).eql({"dest": `${file}`, "file": `${dest}/file`})
            expect(fs.existsSync(`${file}`)).eq(true)
            expect(fs.readlinkSync(`${dest}/file`)).eq( `${file}` )
            expect(f.isSymbolicLink).eq(false)
        })
    }

    describe("B: Moving file", ()=>{
        before(() => {
            mock({
                "B":{
                    "symlink": mock.symlink({ path: "link/to/file"}),
                    "file": "file content",
                    "STORE": {}
                },
            })
        })
        after(mock.restore)

        const x = `./B`
        const file = `${x}/file`
        const dest = `${x}/STORE`
        const f = new File(file, dest)

        moveTest(x, file, dest, f)
    })

    describe("C: Moving folder", ()=>{
        before(() => {
            mock({
                "C":{
                    "symlink": mock.symlink({ path: "link/to/file"}),
                    "file": {}, // it is folder
                    "STORE": {}
                },
            })
        })
        after(mock.restore)

        const x = `./C`
        const file = `${x}/file`
        const dest = `${x}/STORE`
        const f = new File(file, dest)

        moveTest(x, file, dest, f)
    })


})
