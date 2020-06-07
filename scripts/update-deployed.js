#!/usr/bin/env node

// update truffle's "deployed" status of entries in "networks".
const fs = require('fs')
const minimist = require('minimist')

var argv = minimist(process.argv.slice(2))

const FOLDER = './build/contracts/'

const folder = argv.folder || FOLDER

if (!argv.deployed) {
  console.log('usage: truffle-update-deployed [options]\n',
    '  --deployed {deployed.js} - file containing contacts and their deployed address on various networks\n',
    '  --folder - truffle build folder to update. defaults to ' + FOLDER, '\n',
    '\n',
    'sample deployed.js file:\n',
    '{\n',
    '  "42" : {\n',
    '    MyContract: "0xb2F6CE9de06DE948b98b8137668f3fCf74cEfB53"\n',
    '},\n',
    '  "1" : {\n',
    '    MyContract : "0xCD8EE333bd78F3427EEC32851c17016bf11eE8d4"\n',
    '  }\n',
    '}')
  process.exit(1)
}
const deployed = JSON.parse(fs.readFileSync(argv.deployed, { encoding: 'utf8' }))

const files = {}
const modified = {}
Object.keys(deployed).forEach(netid => {
  const d = deployed[netid]
  Object.entries(d).forEach(([contract, address]) => {
    const fname = folder + contract + '.json'
    try {
      if (!files[fname]) {
        files[fname] = JSON.parse(fs.readFileSync(fname, { encoding: 'utf8' }))
      }
      const data = files[fname]
      if (!data.networks) {
        console.log('no "networks" tag in ', fname)
        return
      }
      if (!data.networks[netid]) {
        data.networks[netid] = {}
      }
      const oldaddress = data.networks[netid].address
      if (oldaddress === address) {
        console.log('not modified:', contract, '@', address, 'chain', netid)
      } else {
        if (oldaddress) {
          console.log('override', contract, '@', address, 'chain', netid, 'old ', oldaddress)
        } else {
          console.log('added', contract, '@', address, 'chain', netid)
        }
        data.networks[netid].address = address
        modified[fname] = true
      }
    } catch (e) {
      console.warn('failed to set ', contract + '@' + address, ':', e.message)
    }
  }) // forEach
})

Object.keys(modified).forEach(fname => {
  fs.writeFileSync(fname, JSON.stringify(files[fname], null, 2))
  // fs.renameSync(fname, fname + '.old')
  // fs.renameSync(fname + '.name', fname)
})

