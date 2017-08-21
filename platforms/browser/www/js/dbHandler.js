/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function Person(id, name, contact, level, enabled) {
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.level = level;
    this.enabled = enabled;
}

Person.prototype.toString = function () {
    return "Person{id=" + this.id + " name=" + this.name + " contact=" + this.contact + " level=" + this.level + " enabled=" + this.enabled + "}";
}

var dbHandler = {
    database: null,
    shortName: 'testDb',
    version: '1.0',
    displayName: 'testDb',
    maxSize: 10000000,

    getDataBase: function () {
        if (this.database === null) {
            console.log('opening new db');
            this.database = openDatabase(this.shortName, this.version, this.displayName, this.maxSize);
            console.log('returned db = ' + this.database + ' - ' + (this.database != null));
        } else {
            console.log('db already open');
        }
        return this.database;
    },

    createPersonTable: function (success, error, nulled) {
        this.getDataBase().transaction(function (tx) {
//            tx.executeSql('DROP TABLE Person', nullHandler, nullHandler);
            tx.executeSql('CREATE TABLE IF NOT EXISTS Person(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, contact TEXT NOT NULL, level INTEGER NOT NULL, enabled INTEGER NOT NULL)',
                    [], nulled, error);
        },
                error, success);
    },

    dropPersonTable: function (success, error, nulled) {
        this.getDataBase().transaction(function (tx) {
            tx.executeSql('DROP TABLE Person', nulled, nulled);
        }, error, success);
    },

    findAllPersons: function (error, nulled) {
        var personList = [];
        this.getDataBase().transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM Person;', [],
                    function (transaction, result) {
                        if (result != null && result.rows != null) {
                            for (var i = 0; i < result.rows.length; i++) {
                                var row = result.rows.item(i);
                                var p = new Person(row.id, row.name, row.contact, row.level, row.enabled);
                                personList.push(p);
                            }
                        }
                    },
                    error);
        }, error, nulled);
        return personList;
    },

    insertPerson: function (person, error, nulled) {
        console.log('dbHandler: insert ' + person.toString());
        console.log('dbHandler: id:' + person.id);
        console.log('dbHandler: name:' + person.name);
        console.log('dbHandler: contact:' + person.contact);
        console.log('dbHandler: level:' + person.level);
        console.log('dbHandler: enabled:' + person.enabled);
        this.getDataBase().transaction(function (transaction) {
            transaction.executeSql('INSERT INTO Person(name, contact, level, enabled) VALUES (?,?,?,?)', [person.name, person.contact, person.level, person.enabled], nulled, error);
        });
    }
}

