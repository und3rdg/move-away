/* global before, after */
const expect = require('chai').expect

const Config = require('./../src/node/config.js')
const fs = require('fs')
const mock = require('mock-fs')

describe('node/config.js', () => {


    describe('A: Creating new config.json', () => {
        before(() => {
            mock({
                "A": {
                    "STORE": {}
                }
            })
        })
        after(mock.restore)
        const x = 'A'
        const file = `.config.json`
        const dest = `${x}/STORE`
        const cfg = new Config(dest)

        it('config.json should create config', () => {
            expect(() => fs.lstatSync(`${dest}/${file}`).isFile()).to.throw('ENOENT')
            expect(cfg.create()).to.eq('config created')
            expect(cfg.create()).to.eq('config exist')
            expect(fs.lstatSync(`${dest}/${file}`).isFile()).to.eq(true)
            const configContent = fs.readFileSync(`${dest}/${file}`, 'utf-8')
            expect(configContent).to.eq('{"store":"A/STORE/.config.json","links":[]}')
        })
    })


    describe('B: reading object from config.json', () => {
        before(() => {
            mock({
                "B": {
                    "STORE": {}
                }
            })
        })
        after(mock.restore)
        const x = 'B'
        const file = `.config.json`
        const dest = `${x}/STORE`
        const cfg = new Config(dest)

        it('config.json should create config', () => {
            expect(cfg.create()).to.eq('config created')
            expect(cfg.read()).to.be.an("object")
                .that.eql({store:"B/STORE/.config.json",links:[]})
        })
    })


})
