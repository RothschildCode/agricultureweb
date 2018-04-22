//多入口加载器
//files 入口文件集合
//components 公共组件
var glob = require('glob')
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var entries = require('./entries')
var files = glob.sync('./src/apps/*.js')
var entries = {
    vendor: entries.vendor
}
var pages = {}
// var comps = glob.sync('./src/components/*.vue')
var compsEntry = {
    // components: comps
}
entries = Object.assign({}, entries)
var commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
    // names: ['vendor', 'components']
})
// var dllReferencePlugin = new webpack.DllReferencePlugin({
//     context: __dirname,
//     manifest: require('./dist/vendor.manifest.json')
// })   
var devPlugins = [commonChunkPlugin]
var prodPlugins = [commonChunkPlugin]

files.forEach(function(f) {
    var name = /.*\/(apps\/.*?)\.js/.exec(f)[1];//得到apps/question/index这样的文件名
    entries[name] = f;
    var page = './index.html'
    var devPlug =  new HtmlWebpackPlugin({
        // filename: path.resolve(__dirname, '../public/dist/'+ name +'.html'),
        filename: name + '.html',
        hash: true,
        chunks: ['vendor', name],
        // chunksSortMode: function(c1, c2) {
        //  var o = ['vendor', 'components', name]
        //  var o1 = o.indexOf(c1.names[0]);
        //     var o2 = o.indexOf(c2.names[0]);
        //     return o1 - o2;  
        // },
        minify: { //传递 html-minifier 选项给 minify 输出
        template: page,
          removeComments: true
        },
        inject: 'body'
    })
    var prodPlugin = new HtmlWebpackPlugin({
        // filename: path.resolve(__dirname, '../public/dist/'+ name +'.html'),
        filename: name + '.html',
        hash: true,
        chunks: ['vendor', 'manifest', name],
        // chunksSortMode: function(c1, c2) {
        //  var o = ['vendor', 'components', name]
        //  var o1 = o.indexOf(c1.names[0]);
        //     var o2 = o.indexOf(c2.names[0]);
        //     return o1 - o2;  
        // },
        template: page,
        minify: { //传递 html-minifier 选项给 minify 输出
          removeComments: true
        },
        inject: 'body'
    })
    devPlugins.push(devPlug)
    prodPlugins.push(prodPlugin)
    pages[name] = page
})

console.log('base-entries:')
console.log(entries)
console.log('dev-entries:')
console.log(pages)

console.log('dev-pages:')
console.log(devPlugins)
console.log('prod-pages:')
console.log(prodPlugins)

module.exports = {
    entries,
    devPlugins,
    prodPlugins
}
