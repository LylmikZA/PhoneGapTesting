/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myLibrary = {
  displayConfirmationDialog: function (title, message, buttons, callback) {
    navigator.notification.confirm(
            message, // message
            callback, // callback to invoke with index of button pressed
            title, // title
            buttons          // buttonLabels
            );
  },
  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  encodeUtf8: function (s) {
//    return escape(s);
    return encodeURIComponent(s);
  },
  decodeUtf8: function (s) {
//    return unescape(s);
    return decodeURIComponent(s);
  }

}

