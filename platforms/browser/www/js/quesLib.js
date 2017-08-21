/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var QuesLib = {
  debug: false,
  startQuestionnaire: function () {
    jsonObj = JSON.parse(json);
    qTotal = jsonObj.questions.length;
    qNum = 1;
    answers = [];
    for (var i = 0; i < qTotal; i++) {
      answers[i] = '';
      if (this.debug) console.log(answers[i]);
    }
    document.getElementById('qTitle').innerHTML = '';
    document.getElementById('qAnswer').innerHTML = '';
    this.displayQuestion(qNum);
  },
  checkAnswer: function () {
    var q = jsonObj.questions[qNum - 1];
    var optional = q.optional == null ? false : jsonObj.questions[qNum - 1].optional;
    var ret = 0;
    var answer;
    switch (q.input.type) {
      case 'textline':
      case 'textblock':
      case 'numeric':
      case 'password':
        answer = $('#answer').val().trim();
        var min = q.input.min;
        var max = q.input.max;
        if (answer.length < min) {
          ret = 2;
        } else if (answer.length > max) {
          ret = 2;
        }
        break;

      case 'date':
      case 'time':
        answer = $('#answer').val().trim();
        break;

      case 'email':
        answer = $('#answer').val().trim();
        if (!myLibrary.validateEmail(answer)) {
          ret = 2;
        }
        break;

      case 'number':
        answer = parseInt($('#answer').val().trim());
        if (answer == NaN)
          ret = 2;
        var min = q.input.min;
        var max = q.input.max;
        if (answer < min) {
          ret = 2;
        } else if (answer > max) {
          ret = 2;
        }
        break;

      case 'decimal':
        answer = parseFloat($('#answer').val().trim()).toFixed(2);
        if (answer == NaN)
          ret = 2;
        var min = q.input.min;
        var max = q.input.max;
        if (answer < min) {
          ret = 2;
        } else if (answer > max) {
          ret = 2;
        }
        break;

      case 'dropdown':
        answer = $('#answer').val() == 0 ? '' : $('#answer').val();
        break;

      case 'radio':
      case 'check':
        var numOptions = q.input.options.split('|').length;
        answer = '';
        for (var j = 0; j < numOptions; j++) {
          var elemId = 'answer' + (j + 1);
          if (document.getElementById(elemId).checked) {
            answer += '|' + (j + 1);
          }
        }
        if (answer.length > 0) {
          answer = answer.substring(1);
        }
        break;
    }

    if (ret != 0) {
      return ret;
    } else if ((answer == null || answer == '') && !optional) {
      return 1;
    } else {
      if (this.debug) console.log(answer);
      answers[qNum - 1] = myLibrary.encodeUtf8(answer);
      return 0;
    }
  },
  displayQuestion: function (number) {
    doButtons()
    var checkLimit = 0;
    var noDecimal = false, charCounter = false;
    if (jsonObj === null) {
      toastr.error("JSON object not decoded");
    } else if (number > qTotal) {
      toastr.error("End of questionnaire reached");
    } else {
      var q = jsonObj.questions[number - 1];
      var optional = q.optional ? ' (Optional)' : '';
      var title = 'Question ' + q.number + ' of ' + qTotal + '<br/><br/>' + q.question + optional + '<br>';
      $('#qTitle').html(title).enhanceWithin();
      var htmlStr = '';
      switch (q.input.type) {
        case 'textline':
          htmlStr = '<input type="text" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '"/>';
          var msg = 'Characters: 0';
          if (q.input.min > 0 || q.input.max > 0) {
            msg += ' (';
            if (q.input.min > 0) {
              msg += 'Min: ' + q.input.min;
            }
            if (q.input.max > 0) {
              msg += (q.input.min > 0 ? ' ' : '') + 'Max: ' + q.input.max;
            }
            msg += ')';
            charCounter = true;
          }
          htmlStr += '<span id="charCount">' + msg + '</span>';
          break;

        case 'textblock':
          htmlStr = '<textarea rows="10" id="answer">' + myLibrary.decodeUtf8(answers[qNum - 1]) + '</textarea>';
          var msg = 'Characters: 0';
          if (q.input.min > 0 || q.input.max > 0) {
            msg += ' (';
            if (q.input.min > 0) {
              msg += 'Min: ' + q.input.min;
            }
            if (q.input.max > 0) {
              msg += (q.input.min > 0 ? ' ' : '') + 'Max: ' + q.input.max;
            }
            msg += ')';
            charCounter = true;
          }
          htmlStr += '<span id="charCount">' + msg + '</span>';
          break;

        case 'numeric':
          htmlStr = '<input type="number" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '"/>';
          var msg = 'Characters: 0';
          if (q.input.min > 0 || q.input.max > 0) {
            msg += ' (';
            if (q.input.min > 0) {
              msg += 'Min: ' + q.input.min;
            }
            if (q.input.max > 0) {
              msg += (q.input.min > 0 ? ' ' : '') + 'Max: ' + q.input.max;
            }
            msg += ')';
            charCounter = true;
          }
          htmlStr += '<span id="charCount">' + msg + '</span>';
          break;

        case 'number':
          noDecimal = true; //can add nodecimal and nonegative as a json option?
        case 'decimal':
          htmlStr = '<input type="number" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '"/>';
          var msg = '';
          if (q.input.min > 0 || q.input.max > 0) {
            msg += '(';
            if (q.input.min > 0) {
              msg += 'Min: ' + q.input.min;
            }
            if (q.input.max > 0) {
              msg += (q.input.min > 0 ? ' ' : '') + 'Max: ' + q.input.max;
            }
            msg += ')';
          }
          htmlStr += '<span id="charCount">' + msg + '</span>';
          break;

        case 'password':
          htmlStr = '<input type="password" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '"/>';
          var msg = 'Characters: 0';
          if (q.input.min > 0 || q.input.max > 0) {
            msg += ' (';
            if (q.input.min > 0) {
              msg += 'Min: ' + q.input.min;
            }
            if (q.input.max > 0) {
              msg += (q.input.min > 0 ? ', ' : '') + 'Max: ' + q.input.max;
            }
            msg += ')';
            charCounter = true;
          }
          htmlStr += '<span id="charCount">' + msg + '</span>';
          break;

        case 'email':
          htmlStr = '<input type="email" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '"/>';
          break;

        case 'date':
          htmlStr = '<input type="date" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '" ';
          if (q.input.min !== null) {
            htmlStr += 'min="' + q.input.min + '" ';
          }
          if (q.input.max !== null) {
            htmlStr += 'max="' + q.input.max + '" ';
          }
          htmlStr += '/>';
          break;

        case 'time':
          htmlStr = '<input type="time" id="answer" value="' + myLibrary.decodeUtf8(answers[qNum - 1]) + '"/>';
          break;

        case 'dropdown':
          htmlStr = '<select id="answer" class="select">';
          htmlStr += '<option value=0>Select an option</option>';
          var options = q.input.options.split('|');
          for (var j = 0; j < options.length; j++) {
            htmlStr += '<option value=' + (j + 1) + (j + 1 == myLibrary.decodeUtf8(answers[qNum - 1]) ? ' selected="selected"' : '') + '>' + options[j] + '</option>';
          }
          htmlStr += '</select>';
          break;

        case 'radio':
          htmlStr = '';
          var options = q.input.options.split('|');
          for (var j = 0; j < options.length; j++) {
            var optionHtml = '<input type="radio" name="radioSelect" id="answer' + (j + 1) + '" value="answer' + (j + 1) + '" ';
            if (j + 1 == myLibrary.decodeUtf8(answers[qNum - 1])) {
              optionHtml += ' checked="checked"';
              if (this.debug) console.log('checking option ' + j);
            }
            optionHtml += '/><label for="answer' + (j + 1) + '">' + options[j] + '</label>';
            htmlStr += optionHtml;
          }
          break;

        case 'check':
          var answerSplit = myLibrary.decodeUtf8(answers[qNum - 1]).split('|');
          htmlStr = '';
          var options = q.input.options.split('|');
          for (var j = 0; j < options.length; j++) {
            var optionHtml = '<input type="checkbox" name="checkSelect" id="answer' + (j + 1) + '" value="answer' + (j + 1) + '" ';
            for (var i = 0; i < answerSplit.length; i++) {
              if (j + 1 == answerSplit[i]) {
                optionHtml += ' checked="checked"';
                if (this.debug) console.log('checking option ' + j);
              }
            }
            optionHtml += '/><label for="answer' + (j + 1) + '">' + options[j] + '</label>';
//                            console.log(optionHtml);
            htmlStr += optionHtml;
          }
          if (q.input.max !== null) {
            checkLimit = q.input.max;
          }
          break;
      }
//                console.log(htmlStr);
      $('#qAnswer').html(htmlStr).enhanceWithin();
      if (checkLimit > 0) {
        this.limitChecks(checkLimit);
      }
      if (noDecimal) {
        $("#answer").keypress(function (e) {
          if (e.which < 48 || e.which > 57) {
            if (this.debug) console.log("Integer values only");
            return(false);
          }
        });
      }
      if (charCounter) {
        this.initCharCounter();
      }
    }
  },
  initCharCounter: function () {
    if (this.debug) console.log('init char counter');
    $('#answer').keyup(this.updateCount);
    $('#answer').keydown(this.updateCount);
  },
  updateCount: function () {
    if (this.debug) console.log('update count');
    var q = jsonObj.questions[qNum - 1];
    var cs = $(this).val().length;
    if (q.input.max > 0 && cs > q.input.max) {
      $(this).val($(this).val().substring(0, q.input.max))
      cs = q.input.max;
    }

    var msg = 'Characters: ' + cs;
    if (q.input.min > 0 || q.input.max > 0) {
      msg += ' (';
      if (q.input.min > 0) {
        msg += 'Min: ' + q.input.min;
      }
      if (q.input.max > 0) {
        msg += (q.input.min > 0 ? ', ' : '') + 'Max: ' + q.input.max;
      }
      msg += ')';
      charCounter = true;
    }
    $('#charCount').text(msg);
  },
  limitChecks: function (limit) {
    $('input[type=checkbox]').on('change', function (e) {
      if (this.debug) console.log("checkbox limit check");
      if ($('input[name="checkSelect"]:checked').length > limit) {
        $(this).prop('checked', false);
      }
    });
  }


}

