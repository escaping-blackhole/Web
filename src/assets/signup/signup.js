/**
 * Created by luneice on 18-7-2.
 */

export default (function (window) {
  var AS = AS || {};
  /*模型层*/
  AS.M = (function () {
    // 适配器模式，对 jQuery 的 Ajax 进行适配
    var send = function (params, callback) {
      $.ajax({
        url: params.url,
        type: 'post',
        dataType: 'json',
        data: params.data,
        timeout: 15000,
        headers: {
          'x-csrf-token': document.cookie ? document.cookie.match(/csrfToken=([0-9A-Za-z\-_]+)/)[1] : 'null'
        },
        success: function (res) {
          callback(true, res);
        },
        error: function (res) {
          callback(false, res);
        }
      });
    };

    var available = function (str, way, callback) {
      var params = {
        url: '/signup/verification',
        data: {
          username: str,
          way: way,
          t: new Date().getTime()
        }
      };
      send(params, callback);
    };

    var getAuthCode = function (user, callback) {
      if (typeof user === 'object' && user !== null && user !== undefined){
        var params = {
          url: '/signup/authentication',
          data: user
        };
        send(params, callback);
      }else {
        callback(false, {});
      }
    };

    var verifyAuthCode = function (str, callback) {
      var params = {
        url: '/signup/verifyAuthCode',
        data: {
          token: AS.M.authcodetoken,
          authcode: str
        }
      };
      send(params, callback);
    };

    /*如果其他步骤没问题那么M.user是被定义的*/
    var signup = function (callback) {
      /*添加token*/
      AS.M.user.token = AS.M.authcodetoken;
      var params = {
        url: '/signup/',
        data: AS.M.user
      };
      send(params, callback);
    };

    return {
      available: available,
      signup: signup,
      getAuthCode: getAuthCode,
      verifyAuthCode: verifyAuthCode
    }
  })();

  /*视图层*/
  AS.V = (function () {
    var M = AS.M;
    // 策略模式
    var notice = {
      correct: function (that) {
        var input = $(that);
        var title = input[0].getAttribute('title');
        var str = '该' + title + '可以注册';
        input.siblings('p').removeClass('wrong')[0].innerText = (title === '验证码') ? '验证成功' : str;
      },
      unusable: function (that) {
        var input = $(that);
        var title = input[0].getAttribute('title');
        input.siblings('p').addClass('wrong')[0].innerText = '该' + title + '已经被注册';
      },
      fault: function (that) {
        var input = $(that);
        input.siblings('p').addClass('wrong')[0].innerText = '出现了未知错误，请稍后重试';
      },
      error: function (that, str) {
        var input = $(that);
        input.addClass('wrong').siblings('p').addClass('wrong')[0].innerText = str;
      },
      valid: function (that) {
        var input = $(that);
        input.removeClass('wrong').siblings('p').addClass('wrong')[0].innerText = '';
      }
    };

    var show = {
      nextPage: function () {
        $('.signup-input').fadeOut(350);
        $('.signup-active').delay(350).slideDown();
      },
      prePage: function () {
        $('.signup-active').fadeOut(350);
        $('.signup-input').delay(350).slideDown();
      },
      success: function () {
        $('.signup-active').fadeOut(350);
        var signupres = $('.signup-res');
        var html =
          '<div class="signup-success">' +
          '   <div class="signup-success--bc"></div>' +
          '   <div class="signup-success--txt">恭喜您注册成功！</div>' +
          '   <div class="signup-success--txt">马上跳转...</div>' +
          '</div>';
        signupres.append(html);
        signupres.delay(350).fadeIn();
      },
      failure: function () {
        $('.signup-active').fadeOut(350);
        var signupres = $('.signup-res');
        var html =
          '<div class="signup-failure">' +
          '   <div class="signup-failure--bc"></div>' +
          '   <div class="signup-failure--txt">很抱歉注册失败！</div>' +
          '   <div class="signup-failure--txt">请稍后再试...</div>' +
          '</div>';
        signupres.append(html);
        signupres.delay(350).fadeIn();
      }
    };

    var block = false;
    var countDown = function () {
      // 设定发送邮件的频率为 90s
      if (block) return;
      var that = $('input.authcode.resend');
      var time = 90;
      for (var i = time; i >= 0; i --){
        (function (j) {
          var blockSend = setTimeout(function () {
            if ((time - j) !== 0) {
              that[0].value = (time - j) + '秒后重发';
            } else {
              that[0].value = '重新发送';
              block = false;
              clearTimeout(blockSend);
            }
          }, j * 1000);
        })(i);
      }
      M.getAuthCode(M.user, function (ok, res) {
        if (ok){
          M.authcodetoken = res.token;
          console.log('验证码发送成功', res);
        }
      });
      block = true;
    };
    return {
      notice: notice,
      show: show,
      countDown: countDown
    }
  })();

  /*控制层*/
  AS.C = (function () {
    var M = AS.M;
    var V = AS.V;
    // 组合模式
    var inputArr = $('.signup-comm > input');
    var check = {
      id: false,
      email: false,
      password: false,
      authcode: false
    };
    var regulation = function (str) {
      return (!(/^[A-Za-z0-9!@#$%^&*()_+-=|\\/?<>,.:;]{6,18}$/.test(str)));
    };

    var verify = {
      /*验证学号是否被注册过*/
      id: function () {
        var id = inputArr[0].value;
        /*学号是合法的则取查询是否被注册了，否则提示错误信息*/
        if (/^201[3-9][0-9]{5,6}$/.test(id)){
          M.available(id, 'u', function (ok, res) {
            if (ok) res.success === true ? V.notice.correct(inputArr[0]): V.notice.unusable(inputArr[0]);
            /*网络或者出现其他错误了*/
            else V.notice.fault(inputArr[0]);
            check.id = res.success;
          })
        }else {
          V.notice.error(inputArr[0], '学号不合法');
        }
      },
      /*验证邮箱是否被注册过*/
      email: function () {
        var email = inputArr[1].value;
        /*邮箱是合法的则取查询是否被注册了，否则提示错误信息*/
        if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)){
          M.available(email, 'm', function (ok, res) {
            if (ok) res.success === true ? V.notice.correct(inputArr[1]): V.notice.unusable(inputArr[1]);
            /*网络或者出现其他错误了*/
            else V.notice.fault(inputArr[1]);
            check.email = res.success;
          })
        } else {
          V.notice.error(inputArr[1], '邮箱不合法');
        }
      },
      /*验证密码的强弱和要求*/
      passone: function () {
        var passone = inputArr[2].value;
        if(regulation(passone)) V.notice.error(inputArr[2], '密码包含字母或数字且长度为6-18');
        else V.notice.valid(inputArr[2]);
      },
      /*验证两次输入的密码是否一致*/
      passtwo: function () {
        var passone = inputArr[2].value;
        var passtwo = inputArr[3].value;
        if(regulation(passtwo)) { V.notice.error(inputArr[3], '密码包含字母或数字且长度为6-18');return;}
        else passone === passtwo ? V.notice.valid(inputArr[3]) : V.notice.error(inputArr[3], '两次输入的密码不一致');
        if (passone === passtwo ) check.password = true;
      },
      authcode: function () {
        var input = $('input.authcode');
        if (!(/^[1-9][0-9]{5}$/.test(input[0].value))) {
          V.notice.error(input[0], '验证码非法');
          return;
        }
        M.verifyAuthCode(input[0].value, function (ok, res) {
          if (ok){
            res.success ? V.notice.correct(input[0]) : V.notice.error(input[0], '验证失败');
            check.authcode = res.success;
          }
        });
      }
    };

    /*监听input获得焦点*/
    inputArr.on('focus', function () {
      $(this).removeClass('wrong');
    });

    /*监听input失去焦点*/
    inputArr.on('blur', function () {
      var choose = $(this)[0].getAttribute('class');
      verify[choose]();
    });

    // 观察者模式
    $('input.authcode').on('focus', function () {
      $(this).removeClass('wrong');
    });

    $('input#authcode').on('blur', function () {
      var choose = $(this)[0].getAttribute('class');
      verify[choose]();
    });

    /*监听下一步按钮*/
    $('input.next').on('click', function () {
      for(var key in verify){
        if (key === 'authcode') continue;
        if (!check[key]) verify[key]();
        else verify[key]();
      }

      if(check.id && check.email && check.password){
        /*可以下一步*/
        M.user = {};
        M.user.id = inputArr[0].value;
        M.user.email = inputArr[1].value;
        M.user.password = inputArr[2].value;
        $('.authcode-cont > input.email')[0].value = inputArr[1].value;
        V.show.nextPage();
        V.countDown();
      }
    });

    $('input.pre').on('click', function () {
      V.show.prePage();
    });

    $('input.authcode.resend').on('click', function () {
      V.countDown();
    });

    $('input.finish').on('click', function () {
      if (check.authcode){
        /*成功注册的处理*/
        M.signup(function (ok, res) {
          /*服务器成功处理了*/
          if (ok){
            /*处理结果成功*/
            res.success ? V.show.success() : V.show.failure();
            if (res.success){
              setInterval(function () {
                window.location =  'https://login.luneice.com';
              }, 1200);
            }
          }else {
            /*服务器没有正常处理*/
          }
        });
      }
    });

  })();

  window.AS = AS;

})(window);
