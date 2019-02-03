const File = require("./file.js")
const fs = require("fs")
const mock = require("mock-fs")

describe("node/file.js", ()=>{

    //eslint-disable-next-line



    describe("A: Creating and checking symlinks.", ()=>{
        beforeAll(() => {
            mock({
                "A":{
                    "symlink": mock.symlink({ path: "link/to/file"}),
                    "file": "file content",
                    "STORE": {}
                }
            })
        })
        afterAll(() => { mock.restore() })

        const x = `./A`
        const file = `${x}/file`
        const dest = `${x}/STORE`
        const f = new File(file, dest)

        test("It create symlink.", () => {
            expect(f.createSymlink(`${file}`, `${dest}/newSymlink`)).toEqual([`${file}`, `${dest}/newSymlink`])
            expect(fs.readlinkSync(`${dest}/newSymlink`)).toBe( `${file}` )
        })

        test(`It should by recognized as NOT symlink`, () => {
            expect(f.isSymbolicLink).toBe(false)
        })

        test(`It should  by recognized as symlink`, () => {
            const file2 = `${x}/symlink`
            const f2 = new File(file2, dest)
            expect(f2.isSymbolicLink).toBe(`link/to/file`)
        })
    })



    function moveTest(x, file, dest, f) {
        test("Move file and create symlink", () => {
            expect(f.move()).toEqual({"dest": `${dest}/file`, "file": `${file}`})
            expect(fs.existsSync(`${dest}/file`)).toBe(true)
            expect(fs.readlinkSync(`${file}`)).toBe( `${dest}/file` )
        })

        test("Reverse move file back and create symlink", () => {
            expect(f.move()).toEqual({"dest": `${file}`, "file": `${dest}/file`})
            expect(fs.existsSync(`${file}`)).toBe(true)
            expect(fs.readlinkSync(`${dest}/file`)).toBe( `${file}` )
            expect(f.isSymbolicLink).toBe(false)
        })
    }

    describe("B: Moving file", ()=>{
        beforeAll(() => {
            mock({
                "B":{
                    "symlink": mock.symlink({ path: "link/to/file"}),
                    "file": "file content",
                    "STORE": {}
                },
            })
        })
        afterAll(() => { mock.restore() })

        const x = `./B`
        const file = `${x}/file`
        const dest = `${x}/STORE`
        const f = new File(file, dest)

        moveTest(x, file, dest, f)
    })

    describe("C: Moving folder", ()=>{
        beforeAll(() => {
            mock({
                "C":{
                    "symlink": mock.symlink({ path: "link/to/file"}),
                    "file": {}, // it is folder
                    "STORE": {}
                },
            })
        })
        afterAll(() => { mock.restore() })

        const x = `./C`
        const file = `${x}/file`
        const dest = `${x}/STORE`
        const f = new File(file, dest)

        moveTest(x, file, dest, f)
    })


})
