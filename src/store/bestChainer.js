import PouchDB from 'pouchdb'
// import store from '@/store/store'
// import PouchdbSync from '@/store/modules/pouchdbSync.js'
// var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

export default class BestChainer {
    constructor(a) {
        this.inputValue = a
        this.waits = 0;
        // this is the beginning of the chain
        this.queue = Promise.resolve();
        // console.log('queue: ', this.queue)
    }
    // lets define the 'then' function we have been using
    // now our AsyncChainer can do what Promises do!
    then(callback) {
        callback(this.queue);
    }
    // shedule a callback into the task queue
    // basically builds the following:
    // o.then(o => o.then(o => o.then(o =>o.then(Promise.resolve())))       
    chain(callback) {
        // console.log('queue1: ', this.queue)
        return this.queue = this.queue.then(callback);
    }
    // one way to pass value
    chainedAsyncWait = () => {
        this.chain(async () => {
            await asyncWait();
            console.log(this.waits++);
        });
        return this;
    }

    // another way to pass value
    chainedAsyncCalc = (y) => {
        // console.log('queue2: ', this.queue)
        this.chain((x) => {
            // console.log('1: ', x);
            if (!x) {
                x = y;
            }
            return x * x;
        })
        return this;
    }
    add = (y) => {
        // console.log('queue3: ', this.queue)
        // console.log('Input value: ', this.inputValue)
        this.chain((x) => {
            // console.log('add x: ', x);
            // console.log('add y: ', y);
            // if (!x) {
            //     x = y;
            // }
            return x + y;
        })
        return this;
    }
    subtract = (y) => {
        // console.log('queue4: ', this.queue)
        this.chain((x) => {
            // console.log('subtract x: ', x);
            // console.log('subtract y: ', y);
            // if (!x) {
            //     x = y;
            // }
            return x - y;
        })
        return this;
    }
    get = (dbName) => {

        this.chain(() => {
            var db = new PouchDB(dbName)
            return db.allDocs({
                include_docs: true,
                attachments: true
            }).then(response => {
                var rows = response.rows
                var docs = rows.map(x => x.doc)
                // console.log(docs)
                return docs
            }).catch(err => {
                console.log(err)
            })
        })
        return this
    }
    where = (fieldName, condition, fieldvalue) => {
        // var db = new PouchDB('dogs')
        // db.info().then(response => { console.log('INFO: ', response)})
        
        this.chain((data) => {
            // console.log(data)
            var res = []

            if (condition === 'eq') {
                let range = { field: fieldName, value: fieldvalue };
                res = data.filter(isEqual, range)
            } else {
            let range = { field: fieldName, lower: null, upper: null };
            res = data.filter(isInRange, range)
        }

            return res
        })
        return this
    }
}

function isEqual(value) {
    // console.log(field)
    // console.log(value)

    var idx = Object.keys(value).findIndex(x => x === this.field)
    if (idx >= 0) {
        var fieldValue = Object.values(value)[idx]
            var x = fieldValue === this.value
            return x
    }

    
}
function isInRange(value) {
    // console.log(field)
    console.log(value)

    var idx = Object.keys(value).findIndex(x => x === this.field)
    if (idx >= 0) {
        var fieldValue = Object.values(value)[idx]
        // if (fieldValue === this.fieldValue) {
            var x = fieldValue >= this.lower && value <= this.upper;
            x = fieldValue === this.lower
            return x
        // }
    }

    
}

async function asyncWait() {
    async () => new Promise(resolve => setTimeout(resolve, 1000));
}