import PouchDB from 'pouchdb'
// import store from '@/store/store'
// import PouchdbSync from '@/store/modules/pouchdbSync.js'

const actions = {
    get(dbName, id) {
        var db = new PouchDB(dbName)
        if (id === null || id === undefined) {
            return db.allDocs({
                include_docs: true,
                attachments: true
            }).then(response => {
                var rows = response.rows
                var docs = rows.map(x => x.doc)
                console.log(docs)
                return docs
            }).catch(err => {
                console.log(err)
            })
        } else {
            return db.get(id).then(doc => {
                return doc
            }).catch(err => {
                console.log(err)
            })
        }
    },

    getWhere(dbName, condition) {
        // var db = new PouchDB(dbName)
        // var conditions = condition.split(/(\s-)/)
        var conditions = condition.split(/\s+/);
        console.log('1 ', conditions)
        if (conditions.lenght === 3) {
            return this.get(dbName)
            .then(docs => {
                var filtered = docs.filter(f => f.Color.toLowerCase() === 'brown')
                console.info(filtered)
                return filtered
            })
            .catch(err => {
                console.log(' ERROR: ', err)
            })
        }
        
        // console.log(condition)
    },

    post(dbName, doc) {
        var db = new PouchDB(dbName)
        db.post(doc)
    },
    put(dbName, doc) {
        var db = new PouchDB(dbName)
        db.post(doc)
    },
    remove(dbName, docId) {
        var db = new PouchDB(dbName)
        //db.post(doc)
        if (docId !== null && docId !== undefined) {
            return this.get(dbName, docId).then(response => {
                console.log(response)
                return db.remove(response).then(deleteResult => {
                    return deleteResult
                })
            }).catch(err => {
                console.log('Unable to REMOVE document: ', err)
            })
        }
    }

}

export default actions