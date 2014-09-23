;(function(){
  var ResponsiveIframe = function() {
    this.options = {};
  }

  ResponsiveIframe.prototype.init = function(elems, opts) {
    opts = opts || {};

    var elemsArr;
    var self = this;
    var defaultOptions = {
      xdomain: '*',
      ie : navigator.userAgent.toLowerCase().indexOf('msie') > -1,
      scrollToTop: true
    };

    for (var i in defaultOptions) {
      if (defaultOptions.hasOwnProperty(i)) {
        this.options[i] = typeof opts[i] !== 'undefined' ? opts[i] : defaultOptions[i];
      }
    }

    var privateMethods = {
      messageHandler: function(elem, e) {
        var height,
          r,
          matches,
          strD;

        if (self.options.xdomain !== '*') {
          var regex = new RegExp(self.options.xdomain + '$');
          if (!e.origin) {
            throw new Error('messageHandler(elem, e): There is no origin. You are viewing the page from your file system. Please run through a web server.');
          }
          if (e.origin.match(regex)) {
            matches = true;
          } else {
            throw new Error('messageHandler(elem, e): The orgin doesn\'t match the responsiveiframe xdomain.');
          }
        }

        if (self.options.xdomain === '*' || matches) {
          strD = e.data + '';
          r = strD.match(/^(\d+)(s?)$/);
          if(r && r.length === 3){
            height = parseInt(r[1], 10);
            if (!isNaN(height)) {
              try {
                privateMethods.setHeight(elem, height);
              } catch (ex) {}
            }
            if (self.options.scrollToTop && r[2] === 's'){
              scroll(0,0);
            }
          }
        }
      },

      setHeight: function(elem, height) {
        elem.style.height = height + 'px';
      },

      getDocHeight: function() {
        var D = document;
        return Math.min(
          Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
          Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
          Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
      }
    };

    if (elems.nodeName && elems.nodeName.toLowerCase() === 'iframe') {
      elemsArr = [elems];
    } else if (elems.length) {
      elemsArr = Array.prototype.slice.call(elems);
    } else {
      console.log('Please pass a node or a nodelist to responsiveIframe.');
      return;
    }

    elemsArr.forEach(function(elem) {
      if (window.postMessage) {
        if (window.addEventListener) {
          window.addEventListener('message', function(e) {
            privateMethods.messageHandler(elem, e);
          }, false);
        } else if (window.attachEvent) {
          window.attachEvent('onmessage', function(e) {
            privateMethods.messageHandler(elem, e);
          }, elem);
        }
      } else {
        setInterval(function () {
          var hash = window.location.hash, matches = hash.match(/^#h(\d+)(s?)$/);
          if (matches) {
            privateMethods.setHeight(elem, matches[1]);
            if (self.options.scrollToTop && matches[2] === 's'){
              scroll(0, 0);
            }
          }
        }, 150);
      }
    });
  }

  ResponsiveIframe.prototype.allowResponsiveEmbedding = function() {
    if (window.addEventListener) {
      window.addEventListener('load', this.messageParent, false);
      window.addEventListener('resize', this.messageParent, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', this.messageParent);
      window.attachEvent('onresize', this.messageParent);
    }
  };

  ResponsiveIframe.prototype.messageParent = function(scrollTop) {
    var h = document.body.offsetHeight;

    h = (scrollTop) ? h+'s' : h;
    if (parent.postMessage) {
      parent.postMessage(h ,'*');
    } else {
      window.location.hash = 'h' + h;
    }
  };

  function responsiveIframe() {
    return new ResponsiveIframe();
  }

  // expose
  if ('undefined' === typeof exports) {
    window.responsiveIframe = responsiveIframe;
  } else {
    module.exports = responsiveIframe;
  }
}());
