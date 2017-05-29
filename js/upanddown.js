function mySwiper(para){
        this.init.call(this,para);
    }
    mySwiper.prototype={
        init:function(para){
            var _this=this;
            this.para=para;
            this.way=para.way?para.way:"left";
            this.index=1;
            this.main=$(para.aim);
            this.w=this.main.width();
            this.h=this.main.height();
            this.box=$(para.aim+" .swiper-box");
            this.contain=$(para.aim+" .swiper-contain");
            this.slide=$(para.aim+" .swiper-slide");
            this.size=this.slide.length;
            this.contain.append(_this.slide.eq(0).clone()).prepend(_this.slide.eq(_this.size-1).clone());
            this.slide=$(para.aim+" .swiper-slide");
            this.size=this.size+2;//前后各加一个，为了无线循环
            this.timer=null;
            this.initCss();
            this.scroll();
            if(this.para.leftBtn && this.para.rightBtn){
                $(this.para.leftBtn).click(function(){
                    _this.clickEven("left");
                });
                $(this.para.rightBtn).click(function(){
                    _this.clickEven("right");
                });
            }
        },
        initCss:function(){
            var _this=this;
            this.slide.css({"width":_this.w,"height":_this.h,"float":"left"});
            this.box.css({"width":_this.w,"height":_this.h,"overflow":"hidden"});
            if(this.way=="left"){
                this.contain.css({"width":_this.w*_this.size,"margin-left":-_this.w});
            }else{
                this.contain.css({"height":_this.h*_this.size,"margin-top":-_this.h});
            }
            if(this.para.page){//存在点点
                var pageHtml="";
                for(var i=0;i<this.size-2;i++){
                    pageHtml+="<span class='dot'></span>";
                }
                $(this.para.page).append(pageHtml);
                $(this.para.page+" span").first().addClass(_this.para.pageActive);
            }

        },
        scroll:function(){
            var _this=this;
            _this.timer=setInterval(function(){
                _this.index++;
                if(_this.index>_this.size-1){
                    _this.index=_this.size-1;
                }
                _this.animate(_this.index);
            },2000);
        },
        animate:function(index){
            var _this=this;
            if(_this.way=="left"){
                this.contain.animate({"margin-left":-index*_this.w},'fast',function(){
                    if(_this.size-1==_this.index){
                        _this.contain.css({"margin-left":-_this.w});
                        _this.index=1;
                    }else if(_this.index==0){
                        _this.contain.css({"margin-left":-_this.w*(_this.size-2)});
                        _this.index=_this.size-2;
                    }
                    if(_this.para.page){//存在点点
                        $(_this.para.page +" ."+_this.para.pageActive).removeClass(_this.para.pageActive);
                        $(_this.para.page+" .dot").eq(_this.index-1).addClass(_this.para.pageActive);
                    }
                });
            }else{
                this.contain.animate({"margin-top":-index*_this.h},'fast',function(){
                    if(_this.size-1==_this.index){
                        _this.contain.css({"margin-top":-_this.h});
                        _this.index=1;
                    }else if(_this.index==0){
                        _this.contain.css({"margin-top":-_this.h*(_this.size-2)});
                        _this.index=_this.size-2;
                    }
                    if(_this.para.page){//存在点点
                        $(_this.para.page +" ."+_this.para.pageActive).removeClass(_this.para.pageActive);
                        $(_this.para.page+" .dot").eq(_this.index-1).addClass(_this.para.pageActive);
                    }
                });
            }
        },
        clickEven:function(type){
            if(type=="left"){
                this.index--;
            }else{
                this.index++;
            }
            if(this.index<=0){this.index=0};
            if(this.index>=this.size-1){this.index=this.size-1};
            clearInterval(this.timer);
            this.contain.stop(false,true);
            this.animate(this.index);
            this.scroll();
        }
    }
    
    var my=new mySwiper({
        aim:"#swiper0",
        leftBtn:".hotswiper-button-prev",
        rightBtn:".hotswiper-button-next",
        way:"top"
    });
    
    var indexswiper = new Swiper('#swiper0', {
        pagination: '#indexSwiperPagination',
        nextButton: '.index_banner_right',
        prevButton: '.index_banner_left',
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        loop: true
    });