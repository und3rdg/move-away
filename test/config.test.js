/* global before, after */
const expect = require('chai').expect

const Config = require('./../src/node/config.js')
const fs = require('fs')
const mock = require('mock-fs')

describe('node/config.js', () => {

    describe('A: Creating new config.json', () => {
        before(() => {
            mock({
                "STORE": {}
            })
        })
        after(mock.restore)
        const file = `.config.json`
        const dest = `./STORE`
        const cfg = new Config("STORE")

        it('config.json should create config', () => {
            expect(() => fs.lstatSync(`${dest}/${file}`).isFile()).to.throw('ENOENT')
            expect(cfg.create()).to.eq('config created')
            expect(cfg.create()).to.eq('config exist')
            expect(fs.lstatSync(`${dest}/${file}`).isFile()).to.eq(true)
            const configContent = fs.readFileSync(`${dest}/${file}`, 'utf-8')
            expect(configContent).to.eq('{"store":"STORE/.config.json","links":{}}')
        })
    })
})
