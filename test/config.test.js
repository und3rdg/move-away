/* global before, after */
const expect = require('chai').expect

const Config = require('./../src/node/config.js')
const fs = require('fs')
const mock = require('mock-fs')
// const memfs = require('memfs')
// const path = require('path')
// const md5 = require('md5')

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
        const cfg = new Config('dest')

        it.skip('config.json should create config', () => {
            expect(() => fs.lstatSync(`${dest}/${file}`).isFile()).to.throw('ENOENT')
            cfg.createConfig()
            expect(fs.lstatSync(`${dest}/${file}`).isFile()).to.eq(true)
        })
    })
})
