var util={

    res:function(res,success,message,data){
        res.json({
            success:success,
            message:message,
            docs:data
        })
    },

    resError:function(res,err){
        res.json({
            success:false,
            message:err.message,
            docs:[]
        })
    }
}

module.exports=util;