/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//function Person(id, name, contact, level, enabled) {
//    this.id = id;
//    this.name = name;
//    this.contact = contact;
//    this.level = level;
//    this.enabled = enabled;
//}
//
//Person.prototype.toString = function () {
//    return "Person{id=" + this.id + " name=" + this.name + " contact=" + this.contact + " level=" + this.level + " enabled=" + this.enabled + "}";
//}

var dbHelper = {
    db: null,
    shortName: 'testDb',
    version: '1.0',
    displayName: 'testDb',
    maxSize: 65535,
    getDatabase: function() {
        if (this.db === null){
            this.db = openDatabase(this.shortName, this.version, this.displayName, this.maxSize);
        }
        return this.db;
    },
    createDatabase: function (success, error) {
        console.log('create db');
        this.getDatabase().transaction(function (tx) {
//            tx.executeSql('DROP TABLE User', nullHandler, nullHandler);
            tx.executeSql('CREATE TABLE IF NOT EXISTS User(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, contact TEXT NOT NULL, level INTEGER NOT NULL, enabled INTEGER NOT NULL)', [], nullHandler, error);
        }, error, success);
    },
    deleteAll: function (success, error) {
        console.log('create db');
        this.getDatabase().transaction(function (tx) {
            tx.executeSql('DELETE FROM User', nullHandler, nullHandler);
        }, error, success);
    },
    findAll: function (list, success, error) {
        list.length = 0;
        this.getDatabase().transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM User;', [], function (transaction, result) {
                if (result != null && result.rows != null) {
//                    console.log('rows = ' + result.rows.length);
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var p = new Person(row.id, row.name, row.contact, row.level, row.enabled);
                        list.push(p);
                    }
                }
//                console.log('list size = ' + list.length);
            }, error);
        }, error, success);
    },
    insert: function (p, success, error) {
        this.getDatabase().transaction(function (transaction) {
            transaction.executeSql('INSERT INTO User(name, contact, level, enabled) VALUES (?,?,?,?)', [p.name, p.contact, p.level, p.enabled], nullHandler, error);
        }, error, success);
    },
    nullHandler: function () {}
}

