## Documentation

[http://npr.github.com/responsiveiframe/](http://npr.github.com/responsiveiframe/)

### Changes compared to the original

* CommonJS module for Browserify/Webpack
* No dependency on jQuery
* Therefore different initialization than the original

#### Initialization in the parent

```javascript
var ir = responsiveIframe();
// or with CommonJS/Browserify
// var ir = require('responsiveiframe')();
ir.init(document.querySelectorAll('iframe'), { xdomain: '*' });
```

* Pass the elements as first parameter - single nodes or nodelists are allowed
* The second parameter - the options - are the same as in the original, and may be omitted
* Initialisation in the client is the same as in the original

## Credits

Built and maintained [@NPR](http://github.com/npr/) by
* [John Nelson](https://github.com/johnymonster),
* [Mike Seid](https://github.com/mbseid),
* [Jared Biehler](https://github.com/jaredbiehler),
* [Irakli Nadareishvili](https://github.com/inadarei) and
* [Andy Winder](https://github.com/awinder)

Based on the original prototype by [Ioseb Dzmanashvili](https://github.com/ioseb).

## License

The MIT License (MIT)

Copyright (c) 2011-2014 NPR.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
