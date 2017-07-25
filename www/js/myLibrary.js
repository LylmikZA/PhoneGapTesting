/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myLibrary = {
    displayConfirmationDialog: function(title, message, buttons, callback) {
        navigator.notification.confirm(
                        message, // message
                        callback, // callback to invoke with index of button pressed
                        title, // title
                        buttons          // buttonLabels
                        );
    }
}

