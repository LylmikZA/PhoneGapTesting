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
