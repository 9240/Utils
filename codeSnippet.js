// vue滑动监听
this.$nextTick(()=>{
    this.$refs.materialList.addEventListener('scroll', function(e){
        var scr = this.scrollTop; // 向上滚动的那一部分高度
        var clientHeight = this.clientHeight// 屏幕高度也就是当前设备静态下你所看到的视觉高度
        var scrHeight = this.scrollHeight; // 整个网页的实际高度
        if(scr + clientHeight >= scrHeight){
            // 触底
        }else{
            // 非触底
        }
    });
})