module.exports={
    devServer:{
        proxy:{
            '/api':{
                // https://autumnfish.cn/
                target:'https://netease-cloud-music-api-pnwpdpkcx-xinxin-l.vercel.app/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}