const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/resources':{
                target: 'http://localhost:8080',
                changeOrigin: true
            },
            '/localmock':{
                target: 'http://localhost:8086', 
                pathRewrite: {
                    '^/localmock': '/mock'  
                },
                changeOrigin: true
            },
            '/sgser':{
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        },
        port:8086
    },
    //publicPath: './',
    //outputDir: 'dist',
    //lintOnSave: true,
    chainWebpack: (config) => {
        config.module
            .rule('')
            .test(/mxClient\.js$/)
            .use('exports-loader')
            .loader('exports-loader?mxClient,mxGraphModel,mxActor,mxShape,mxConnectionConstraint,mxPoint,mxCellState,mxHierarchicalLayout,mxCompactTreeLayout,mxPolyline,mxEventObject,mxGraph,mxPrintPreview,mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxImage,mxGeometry,mxRubberband,mxKeyHandler,mxDragSource,mxEvent,mxUtils,mxWindow,mxEvent,mxCell,mxPerimeter,mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager,mxEdgeHandler,mxGuide,mxCodec,mxObjectCodec,mxCodecRegistry,mxDefaultKeyHandler')
            .end();
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'));
        // 按这种格式.set('', resolve('')) 自己添加
    }
}