// 把less 语法 编译成css?

const less = require('less')

module.exports = function(source) {
  less.render(source, (error, output) => {
    this.callback(error, output.css)
  })
}
