window.Chartx||(Chartx={_start:function(){function a(a){if(h.length>0)for(var b=0,c=h.length;c>b;b++)if(0==a.indexOf(h[b].name))return!0}for(var b,c=document.getElementsByTagName("script"),d=c.length-1;d>=0;d--){var e=c[d].getAttribute("src");if(e.indexOf("chartx/index")>=0){b=e.substr(0,e.indexOf("chartx/"));break}}var f=b.replace(/(^\s*)|(\s*$)/g,"").replace(/[^"]*(thx\/charts.+)/,"$1"),g=define,h=[{name:"canvax"},{name:"chartx"}];window.define=function(b,c,d){return"string"==typeof b&&a(b)?g(f+b,c,function(a,b,e){for(var g=[],h=0,i=c.length;i>h;h++)g.push(a(f+c[h]));e.exports=d.apply(window,g)}):g.apply(window,arguments)},Chartx._start=null,delete Chartx._start}}),Chartx._start&&Chartx._start(),define("chartx/chart/index",["canvax/index","canvax/core/Base"],function(a,b){var c=function(c,d,e){_&&!_.deepExtend&&b.setDeepExtend(),this.el=b.getEl(c),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.padding={top:20,right:10,bottom:0,left:10},this.canvax=new a({el:this.el}),this.stage=new a.Display.Stage({id:"main-chart-stage"+(new Date).getTime()}),this.canvax.addChild(this.stage),arguments.callee.superclass.constructor.apply(this,arguments),this.init.apply(this,arguments)};return c.Canvax=a,c.extend=function(a,c,d){var e=this,f=function(){e.apply(this,arguments),d&&d.apply(this,arguments)};return f.extend=e.extend,b.creatClass(f,e,a,c)},Chartx.extend=b.creatClass,b.creatClass(c,a.Event.EventDispatcher,{inited:!1,init:function(){},dataFrame:null,draw:function(){},destroy:function(){this.clean(),this.el.innerHTML="",this._destroy&&this._destroy()},clean:function(){for(var a=0,b=this.canvax.children.length;b>a;a++)for(var c=this.canvax.getChildAt(a),d=0,e=c.children.length;e>d;d++)c.getChildAt(d).destroy(),d--,e--},resize:function(){this.clean(),this.width=parseInt(this.el.offsetWidth),this.height=parseInt(this.el.offsetHeight),this.canvax.resize(),this.draw()},reset:function(a){return a&&a.data&&!a.options&&this.resetData?void this.resetData(a.data):(a&&a.options&&(_.deepExtend(this,a.options),this.dataFrame&&(this.dataFrame=this._initData(this.dataFrame.org))),a&&a.data&&(this.dataFrame=this._initData(a.data)),this.clean(),this.canvax.getDomContainer().innerHTML="",void this.draw())},_rotate:function(a){var b=this.width,c=this.height;this.width=c,this.height=b;var d=this;_.each(d.stage.children,function(e){e.context.rotation=a||-90,e.context.x=(b-c)/2,e.context.y=(c-b)/2,e.context.rotateOrigin.x=d.width*e.context.$model.scaleX/2,e.context.rotateOrigin.y=d.height*e.context.$model.scaleY/2})},_initData:function(a){return a}}),c}),define("chartx/chart/theme",["chartx/utils/colorformat"],function(a){var b="#ff6600",c=["#ff8533","#73ace6","#82d982","#e673ac","#cd6bed","#8282d9","#c0e650","#e6ac73","#6bcded","#73e6ac","#ed6bcd","#9966cc"],d={colors:c,brandColor:b};return d}),define("chartx/components/anchor/Anchor",["canvax/index","canvax/shape/Line","canvax/shape/Circle"],function(a,b,c){var d=function(a){this.w=0,this.h=0,this.enabled=0,this.xAxis={lineWidth:1,fillStyle:"#0088cf",lineType:"dashed"},this.yAxis={lineWidth:1,fillStyle:"#0088cf",lineType:"dashed"},this.node={enabled:1,r:2,fillStyle:"#0088cf",strokeStyle:"#0088cf",lineWidth:2},this.text={enabled:0,fillStyle:"#0088cf"},this.pos={x:0,y:0},this.cross={x:0,y:0},this.sprite=null,this._txt=null,this._circle=null,this._xAxis=null,this._yAxis=null,this.init(a)};return d.prototype={init:function(b){b&&_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"AnchorSprite"})},draw:function(a,b,c){this._xAxis=b,this._yAxis=c,this._initConfig(a),this.sprite.context.x=this.pos.x,this.sprite.context.y=this.pos.y,this.enabled&&this._widget()},show:function(){this.sprite.context.visible=!0,this._circle.context.visible=!0,this._txt&&(this._txt.context.visible=!0)},hide:function(){this.sprite.context.visible=!1,this._circle.context.visible=!1,this._txt&&(this._txt.context.visible=!1)},_initConfig:function(a){a&&_.deepExtend(this,a)},resetCross:function(a){this._xLine.context.yStart=a.y,this._xLine.context.yEnd=a.y,this._yLine.context.xStart=a.x,this._yLine.context.xEnd=a.x;var b=this.sprite.localToGlobal(a);if(this._circle.context.x=b.x,this._circle.context.y=b.y,this.text.enabled){var b=this.sprite.localToGlobal(a);this._txt.context.x=parseInt(b.x),this._txt.context.y=parseInt(b.y);var c=this._xAxis.dataSection,d=c.length,e=parseInt(a.x/this.w*(c[d-1]-c[0])+c[0]),f=this._yAxis.dataSection,g=f.length,h=parseInt((this.h-a.y)/this.h*(f[g-1]-f[0])+f[0]);this._txt.resetText("（X："+e+"，Y："+h+"）"),a.y<=20?this._txt.context.textBaseline="top":this._txt.context.textBaseline="bottom",a.x<=this._txt.getTextWidth()?this._txt.context.textAlign="left":this._txt.context.textAlign="right"}},_widget:function(){var d=this;d._xLine=new b({id:"x",context:{xStart:0,yStart:d.cross.y,xEnd:d.w,yEnd:d.cross.y,lineWidth:d.xAxis.lineWidth,strokeStyle:d.xAxis.fillStyle,lineType:d.xAxis.lineType}}),d.sprite.addChild(d._xLine),d._yLine=new b({id:"y",context:{xStart:d.cross.x,yStart:0,xEnd:d.cross.x,yEnd:d.h,lineWidth:d.yAxis.lineWidth,strokeStyle:d.yAxis.fillStyle,lineType:d.yAxis.lineType}}),this.sprite.addChild(d._yLine);var e=d.sprite.localToGlobal(d.cross);d._circle=new c({context:{x:parseInt(e.x),y:parseInt(e.y),r:d._getProp(d.node.r),fillStyle:d._getProp(d.node.fillStyle)||"#ff0000",strokeStyle:d._getProp(d.node.strokeStyle)||"#cc3300",lineWidth:d._getProp(d.node.lineWidth)||4}}),d.sprite.getStage().addChild(d._circle),d.text.enabled&&(d._txt=new a.Display.Text("",{context:{x:parseInt(e.x),y:parseInt(e.y),textAlign:"right",textBaseline:"bottom",fillStyle:d.text.fillStyle}}),d.sprite.getStage().addChild(d._txt))},_getProp:function(a){return _.isFunction(a)?a():a}},d}),define("chartx/components/back/Back",["canvax/index","canvax/shape/Line","chartx/utils/tools"],function(a,b,c){var d=function(a){this.w=0,this.h=0,this.pos={x:0,y:0},this.enabled=1,this.xOrigin={enabled:1,lineWidth:1,strokeStyle:"#e6e6e6"},this.yOrigin={enabled:1,lineWidth:1,strokeStyle:"#e6e6e6",biaxial:!1},this.xAxis={enabled:1,data:[],org:null,lineType:"solid",lineWidth:1,strokeStyle:"#f0f0f0",filter:null},this.yAxis={enabled:0,data:[],org:null,lineType:"solid",lineWidth:1,strokeStyle:"#f0f0f0",filter:null},this.sprite=null,this.xAxisSp=null,this.yAxisSp=null,this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},draw:function(a){_.deepExtend(this,a),this._widget(),this.setX(this.pos.x),this.setY(this.pos.y)},update:function(a){this.sprite.removeAllChildren(),this.draw(a)},_widget:function(){var c=this;if(this.enabled){c.xAxisSp=new a.Display.Sprite,c.sprite.addChild(c.xAxisSp),c.yAxisSp=new a.Display.Sprite,c.sprite.addChild(c.yAxisSp);for(var d=c.xAxis.data,e=0,f=d.length;f>e;e++){var g=d[e],h=new b({id:"back_line_"+e,context:{xStart:0,yStart:g.y,xEnd:0,yEnd:g.y,lineType:c.xAxis.lineType,lineWidth:c.xAxis.lineWidth,strokeStyle:c.xAxis.strokeStyle}});c.xAxis.enabled&&(_.isFunction(c.xAxis.filter)&&c.xAxis.filter({layoutData:c.yAxis.data,index:e,line:h}),c.xAxisSp.addChild(h),h.animate({xStart:0,xEnd:c.w},{duration:500,delay:80*(f-e),id:h.id}))}for(var d=c.yAxis.data,e=0,f=d.length;f>e;e++){var g=d[e],h=new b({context:{xStart:g.x,yStart:0,xEnd:g.x,yEnd:-c.h,lineType:c.yAxis.lineType,lineWidth:c.yAxis.lineWidth,strokeStyle:c.yAxis.strokeStyle,visible:g.x?!0:!1}});c.yAxis.enabled&&(_.isFunction(c.yAxis.filter)&&c.yAxis.filter({layoutData:c.xAxis.data,index:e,line:h}),c.yAxisSp.addChild(h))}var i=null==c.yAxis.org?0:_.find(c.yAxis.data,function(a){return a.content==c.yAxis.org}).x,h=new b({context:{xStart:i,xEnd:i,yEnd:-c.h,lineWidth:c.yOrigin.lineWidth,strokeStyle:c.yOrigin.strokeStyle}});if(c.yOrigin.enabled&&c.sprite.addChild(h),c.yOrigin.biaxial){var j=new b({context:{xStart:c.w,xEnd:c.w,yEnd:-c.h,lineWidth:c.yOrigin.lineWidth,strokeStyle:c.yOrigin.strokeStyle}});c.yOrigin.enabled&&c.sprite.addChild(j)}var k=null==c.xAxis.org?0:_.find(c.xAxis.data,function(a){return a.content==c.xAxis.org}).y,h=new b({context:{yStart:k,xEnd:c.w,yEnd:k,lineWidth:c.xOrigin.lineWidth,strokeStyle:c.xOrigin.strokeStyle}});c.xOrigin.enabled&&c.sprite.addChild(h)}}},d}),define("chartx/components/datazoom/index",["canvax/index","canvax/shape/Rect","canvax/shape/Line"],function(a,b,c){var d=function(a){this.range={start:0,end:1},this.count=1,this.pos={x:0,y:0},this.w=0,this.h=d.height,this.color="#70aae8",this.bg={fillStyle:"#999",strokeStyle:"#999",lineWidth:0},this.dragIng=function(){},this.dragEnd=function(){},a&&_.deepExtend(this,a),this.barH=this.h-6,this.barY=3,this.btnW=8,this.btnFillStyle=this.color,this.btnLeft=null,this.btnRgiht=null,this.init()};return d.prototype={init:function(){var b=this;this.sprite=new a.Display.Sprite({id:"dataZoom",context:{x:this.pos.x,y:this.pos.y}}),this.dataZoomBg=new a.Display.Sprite({id:"dataZoomBg"}),this.dataZoomBtns=new a.Display.Sprite({id:"dataZoomBtns"}),this.sprite.addChild(this.dataZoomBg),this.sprite.addChild(this.dataZoomBtns),b.widget(),b._setLines()},widget:function(){var c=this,d=new b({context:{x:0,y:this.barY,width:this.w,height:this.barH,lineWidth:this.bg.lineWidth,strokeStyle:this.bg.strokeStyle,fillStyle:this.bg.fillStyle,globalAlpha:.05}});this.sprite.addChild(d),this.btnLeft=new b({id:"btnLeft",dragEnabled:!0,context:{x:this.range.start/this.count*this.w,y:this.barY+1,width:this.btnW,height:this.barH-1,fillStyle:this.btnFillStyle,cursor:"move"}}),this.btnLeft.on("draging",function(){this.context.y=c.barY+1,this.context.x<0&&(this.context.x=0),this.context.x>c.btnRight.context.x-c.btnW-2&&(this.context.x=c.btnRight.context.x-c.btnW-2),c.rangeRect.context.width=c.btnRight.context.x-this.context.x-c.btnW,c.rangeRect.context.x=this.context.x+c.btnW,c.setRange()}),this.btnLeft.on("dragend",function(){c.dragEnd(c.range)}),this.btnRight=new b({id:"btnRight",dragEnabled:!0,context:{x:this.range.end/this.count*this.w-this.btnW,y:this.barY+1,width:this.btnW,height:this.barH-1,fillStyle:this.btnFillStyle,cursor:"move"}}),this.btnRight.on("draging",function(){this.context.y=c.barY+1,this.context.x<c.btnLeft.context.x+c.btnW+2&&(this.context.x=c.btnLeft.context.x+c.btnW+2),this.context.x>c.w-c.btnW&&(this.context.x=c.w-c.btnW),c.rangeRect.context.width=this.context.x-c.btnLeft.context.x-c.btnW,c.setRange()}),this.btnRight.on("dragend",function(){c.dragEnd(c.range)}),this.rangeRect=new b({id:"btnCenter",dragEnabled:!0,context:{x:this.btnLeft.context.x+c.btnW,y:this.barY+1,width:this.btnRight.context.x-this.btnLeft.context.x-c.btnW,height:this.barH-1,fillStyle:this.btnFillStyle,globalAlpha:.3,cursor:"move"}}),this.rangeRect.on("draging",function(a){this.context.y=c.barY+1,this.context.x<c.btnW&&(this.context.x=c.btnW),this.context.x>c.w-this.context.width-c.btnW&&(this.context.x=c.w-this.context.width-c.btnW),c.btnLeft.context.x=this.context.x-c.btnW,c.btnRight.context.x=this.context.x+this.context.width,c.setRange()}),this.rangeRect.on("dragend",function(){c.dragEnd(c.range)}),this.linesLeft=new a.Display.Sprite({id:"linesLeft"}),this._addLines({sprite:this.linesLeft}),this.linesRight=new a.Display.Sprite({id:"linesRight"}),this._addLines({sprite:this.linesRight}),this.linesCenter=new a.Display.Sprite({id:"linesCenter"}),this._addLines({count:6,sprite:this.linesCenter}),this.dataZoomBtns.addChild(this.rangeRect),this.dataZoomBtns.addChild(this.linesCenter),this.dataZoomBtns.addChild(this.btnLeft),this.dataZoomBtns.addChild(this.btnRight),this.dataZoomBtns.addChild(this.linesLeft),this.dataZoomBtns.addChild(this.linesRight)},setRange:function(){var a=this.btnLeft.context.x/this.w*this.count,b=(this.btnRight.context.x+this.btnW)/this.w*this.count;this.range.start=a,this.range.end=b,this.dragIng(this.range),this._setLines()},_setLines:function(){var a=this,b=a.dataZoomBtns.getChildById("linesLeft"),c=a.dataZoomBtns.getChildById("linesRight"),d=a.dataZoomBtns.getChildById("linesCenter"),e=a.dataZoomBtns.getChildById("btnLeft"),f=a.dataZoomBtns.getChildById("btnRight"),g=a.dataZoomBtns.getChildById("btnCenter");b.context.x=e.context.x+(e.context.width-b.context.width)/2,b.context.y=e.context.y+(e.context.height-b.context.height)/2,c.context.x=f.context.x+(f.context.width-c.context.width)/2,c.context.y=f.context.y+(f.context.height-c.context.height)/2,d.context.x=g.context.x+(g.context.width-d.context.width)/2,d.context.y=g.context.y+(g.context.height-d.context.height)/2},_addLines:function(a){for(var b=this,c=a.count||2,d=a.sprite,e=a.dis||2,f=0,g=c;g>f;f++)d.addChild(b._addLine({x:f*e}));d.context.width=f*e-1,d.context.height=6},_addLine:function(a){var b=a||{},d=new c({id:b.id||"",context:{x:b.x||0,y:b.y||0,xEnd:b.xEnd||0,yEnd:b.yEnd||6,lineWidth:b.lineWidth||1,strokeStyle:b.strokeStyle||"#ffffff"}});return d}},d.height=46,d}),define("chartx/components/legend/index",["canvax/index","canvax/shape/Rect"],function(a,b){var c=function(a,b){this.data=a||[],this.w=0,this.h=0,this.tag={height:20},this.enabled=1,this.icon={width:6,height:6,lineWidth:1,fillStyle:"#999"},this.layoutType="vertical",this.sprite=null,this.init(b)};return c.prototype={init:function(b){b&&_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"LegendSprite"}),this.draw()},pos:function(a){this.sprite.context.x=a.x,this.sprite.context.y=a.y},draw:function(a,b,c){this.enabled&&this._widget()},label:function(a){return a.field+"："+a.value},_widget:function(){var c=this,d=0;_.each(this.data,function(e,f){var g=new a.Display.Sprite({context:{height:c.tag.height,y:c.tag.height*f}}),h=new b({context:{width:c.icon.width,height:c.icon.height,x:0,y:c.tag.height/2-c.icon.height/2,fillStyle:e.fillStyle}});g.addChild(h);var i=c.label(e),j=new a.Display.Text(i,{context:{x:c.icon.width+6,y:c.tag.height/2,textAlign:"left",textBaseline:"middle",fillStyle:"#333"}});g.addChild(j),g.context.width=c.icon.width+6+j.getTextWidth(),d=Math.max(d,g.context.width),c.sprite.addChild(g)}),c.sprite.context.width=d,c.sprite.context.height=c.sprite.children.length*c.tag.height,c.w=d+10,c.h=c.sprite.children.length*c.tag.height}},c}),define("chartx/components/markline/index",["canvax/index","canvax/shape/BrokenLine","canvax/display/Sprite","canvax/display/Text"],function(a,b,c,d){var e=function(a){this.w=0,this.h=0,this.field=null,this.origin={x:0,y:0},this.line={y:0,list:[],strokeStyle:"#000000",lineWidth:1,smooth:!1,lineType:"dashed"},this.text={enabled:!1,content:"",fillStyle:"#999999",fontSize:12,format:null,lineType:"dashed"},this.filter=function(){},this._doneHandle=null,this.done=function(a){this._doneHandle=a},this.txt=null,a&&_.deepExtend(this,a),this.init()};return e.prototype={init:function(){var a=this;this.sprite=new c({context:{x:this.origin.x,y:this.origin.y}}),setTimeout(function(){a.widget()},10)},widget:function(){var a=this,c=new b({id:"line",context:{y:a.line.y,pointList:a.line.list,strokeStyle:a.line.strokeStyle,lineWidth:a.line.lineWidth,lineType:a.line.lineType}});if(a.sprite.addChild(c),a.text.enabled){var e=new d(a.text.content,{context:a.text});this.txt=e,a.sprite.addChild(e),_.isNumber(a.text.x)?(e.context.x=a.text.x,e.context.y=a.text.y):(e.context.x=this.w-e.getTextWidth(),e.context.y=a.line.y-e.getTextHeight())}a._done(),a.filter(a)},_done:function(){_.isFunction(this._doneHandle)&&this._doneHandle.apply(this,[])}},e}),define("chartx/components/markpoint/index",["canvax/index","canvax/animation/Tween"],function(a,b){var c=function(a,c,d){this.markTarget=null,this.data=d,this.point={x:0,y:0},this.normalColor="#6B95CF",this.shapeType="droplet",this.fillStyle=null,this.strokeStyle=null,this.lineWidth=1,this.globalAlpha=.7,this.duration=800,this.easing=b.Easing.Linear.None,this.hr=8,this.vr=12,this.r=5,this.sprite=null,this.shape=null,this.iGroup=null,this.iNode=null,this.iLay=null,this._doneHandle=null,this.done=function(a){this._doneHandle=a},this.realTime=!1,this.tween=null,this.filter=function(){},"markPoint"in a&&(this.enabled=!0,_.deepExtend(this,a.markPoint)),c&&_.deepExtend(this,c),this.init()};return c.prototype={init:function(){var c=this;this.sprite=new a.Display.Sprite({context:{x:this.point.x,y:this.point.y}}),this.sprite.on("destroy",function(a){c.tween&&(c.tween.stop(),b.remove(c.tween)),c.timer&&cancelAnimationFrame(c.timer)}),setTimeout(function(){c.widget()},10)},widget:function(){switch(this._fillStyle=this._getColor(this.fillStyle,this.data),this._strokeStyle=this._getColor(this.strokeStyle,this.data),this.shapeType.toLocaleLowerCase()){case"circle":this._initCircleMark();break;case"droplet":this._initDropletMark()}},_getColor:function(a,b,c){var d=a;return _.isFunction(a)&&(d=a(b)),d&&""!=d||(d=arguments.length>=3?c:this.normalColor),d},_done:function(){this.shape.context.visible=!0,this.shapeBg&&(this.shapeBg.context.visible=!0),this.shapeCircle&&(this.shapeCircle.context.visible=!0),_.isFunction(this._doneHandle)&&this._doneHandle.apply(this,[]),_.isFunction(this.filter)&&this.filter(this)},_initCircleMark:function(){var a=this;require(["canvax/shape/Circle"],function(b){var c={r:a.r,fillStyle:a._fillStyle,lineWidth:a.lineWidth,strokeStyle:a._strokeStyle,globalAlpha:a.globalAlpha,cursor:"point",visible:!1};a.shape=new b({context:c}),a.sprite.addChild(a.shape),a._realTimeAnimate(),a._done()})},destroy:function(){this.tween&&this.tween.stop(),this.sprite.destroy()},_realTimeAnimate:function(){function a(){c.timer=requestAnimationFrame(a),b.update()}var c=this;if(c.realTime){c.shapeBg||(c.shapeBg=c.shape.clone(),c.sprite.addChildAt(c.shapeBg,0)),c.timer=null;var d=function(){c.tween=new b.Tween({r:c.r,alpha:c.globalAlpha}).to({r:3*c.r,alpha:0},c.duration).onUpdate(function(){c.shapeBg.context.r=this.r,c.shapeBg.context.globalAlpha=this.alpha}).repeat(1/0).delay(800).onComplete(function(){}).easing(c.easing).start(),a()};d()}},_initDropletMark:function(){var a=this;require(["canvax/shape/Droplet","canvax/shape/Circle"],function(b,c){var d={y:-a.vr,scaleY:-1,hr:a.hr,vr:a.vr,fillStyle:a._fillStyle,lineWidth:a.lineWidth,strokeStyle:a._strokeStyle,globalAlpha:a.globalAlpha,cursor:"point",visible:!1};a.shape=new b({hoverClone:!1,context:d}),a.sprite.addChild(a.shape);var e={y:-a.vr,x:1,r:Math.max(a.hr-6,2),fillStyle:"#fff",visible:!1};a.shapeCircle=new c({context:e}),a.sprite.addChild(a.shapeCircle),a._done()})}},c}),define("chartx/components/tips/tip",["canvax/index","canvax/shape/Rect","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.enabled=!0,this.tipDomContainer=b,this.cW=0,this.cH=0,this.dW=0,this.dH=0,this.backR="5px",this.sprite=null,this.content=null,this.fillStyle="rgba(255,255,255,0.95)",this.text={fillStyle:"#999"},this.strokeStyle="#ccc",this.lineWidth=1,this.alpha=.5,this._tipDom=null,this.offset=10,this.tipsInfo={},this.prefix=[],this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"TipSprite"});var c=this;this.sprite.on("destroy",function(){c._tipDom=null})},show:function(a){if(this.enabled){this.hide();var b=a.target.getStage();this.cW=b.context.width,this.cH=b.context.height,this._initContent(a),this._initBack(a),this.setPosition(a),this.sprite.toFront()}},move:function(a){this.enabled&&(this._setContent(a),this._resetBackSize(a),this.setPosition(a))},hide:function(){this.enabled&&(this.sprite.removeAllChildren(),this._removeContent())},setPosition:function(a){if(this._tipDom){var b=a.pos||a.target.localToGlobal(a.point),c=this._checkX(b.x+this.offset),d=this._checkY(b.y+this.offset);this.sprite.parent.globalToLocal({x:c,y:d});this._tipDom.style.cssText+=";visibility:visible;left:"+c+"px;top:"+d+"px;"}},_initContent:function(a){this._tipDom=document.createElement("div"),this._tipDom.className="chart-tips",this._tipDom.style.cssText+="；-moz-border-radius:"+this.backR+"; -webkit-border-radius:"+this.backR+"; border-radius:"+this.backR+";background:"+this.fillStyle+";border:1px solid "+this.strokeStyle+";visibility:hidden;position:absolute;display:inline-block;*display:inline;*zoom:1;padding:6px;color:"+this.text.fillStyle+";line-height:1.5",this._tipDom.style.cssText+="; -moz-box-shadow:1px 1px 3px "+this.strokeStyle+"; -webkit-box-shadow:1px 1px 3px "+this.strokeStyle+"; box-shadow:1px 1px 3px "+this.strokeStyle+";",this.tipDomContainer.appendChild(this._tipDom),this._setContent(a)},_removeContent:function(){this._tipDom&&(this.tipDomContainer.removeChild(this._tipDom),this._tipDom=null)},_setContent:function(a){this._tipDom&&(this._tipDom.innerHTML=this._getContent(a),this.dW=this._tipDom.offsetWidth,this.dH=this._tipDom.offsetHeight)},_getContent:function(a){_.extend(this.tipsInfo,a.tipsInfo||a.eventInfo||{});var b=_.isFunction(this.content)?this.content(this.tipsInfo):this.content;return b||0==b||(b=this._getDefaultContent(this.tipsInfo)),b},_getDefaultContent:function(a){var b="<table>",d=this;return _.each(a.nodesInfoList,function(a,e){b+="<tr style='color:"+(a.color||a.fillStyle||a.strokeStyle)+"'>";var f=d.prefix[e];f?b+="<td>"+f+"：</td>":a.field&&(b+="<td>"+a.field+"：</td>"),b+="<td>"+c.numAddSymbol(a.value)+"</td></tr>"}),b+="</table>"},_initBack:function(a){return},_resetBackSize:function(a){},_checkX:function(a){var b=this.dW+2;return 0>a&&(a=0),a+b>this.cW&&(a=this.cW-b),a},_checkY:function(a){var b=this.dH+2;return 0>a&&(a=0),a+b>this.cH&&(a=this.cH-b),a}},d}),define("chartx/components/xaxis/xAxis",["canvax/index","canvax/core/Base","canvax/shape/Line","chartx/utils/tools"],function(a,b,c,d){var e=function(a,b){this.graphw=0,this.graphh=0,this.yAxisW=0,this.w=0,this.h=0,this.disY=1,this.dis=6,this.label="",this._label=null,this.line={enabled:1,width:1,height:4,strokeStyle:"#cccccc"},this.text={fillStyle:"#999",fontSize:12,rotation:0,format:null,textAlign:null},this.maxTxtH=0,this.pos={x:null,y:null},this.enabled=1,this.disXAxisLine=6,this.disOriginX=0,this.xGraphsWidth=0,this.dataOrg=[],this.dataSection=[],this._layoutDataSection=[],this.data=[],this.layoutData=[],this.sprite=null,this._textMaxWidth=0,this.leftDisX=0,this.filter=null,this.isH=!1,this.animation=!0,this.init(a,b)};return e.prototype={init:function(b,c){this.sprite=new a.Display.Sprite({id:"xAxisSprite"}),this._initHandle(b,c)},_initHandle:function(a,b){b&&b.org&&(this.dataOrg=b.org),a&&_.deepExtend(this,a),0!=this.text.rotation&&this.text.rotation%90==0&&(this.isH=!0),this.line.enabled||(this.line.height=1),0==this.dataSection.length&&(this.dataSection=this._initDataSection(this.dataOrg)),this._layoutDataSection=this._formatDataSectionText(this.dataSection),this._setTextMaxWidth(),this._setXAxisHeight()},_initDataSection:function(a){return _.flatten(a)},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},resetData:function(a,b){b&&_.deepExtend(this,b),this.sprite.removeAllChildren(),this.dataSection=[],this._initHandle(null,a),this.draw()},update:function(a,b){_.deepExtend(this,a),this.resetData(b)},draw:function(a){this._getLabel(),this._initConfig(a),this.data=this._trimXAxis(this.dataSection,this.xGraphsWidth);var b=this;_.each(this.data,function(a,c){a.layoutText=b._layoutDataSection[c]}),this._trimLayoutData(),this.setX(this.pos.x),this.setY(this.pos.y),this.enabled&&(this._widget(),this.text.rotation||this._layout())},_getLabel:function(){this.label&&""!=this.label&&(this._label=new a.Display.Text(this.label,{context:{fontSize:this.text.fontSize,textAlign:this.isH?"center":"left",textBaseline:this.isH?"top":"middle",fillStyle:this.text.fillStyle,rotation:this.isH?-90:0}}))},_initConfig:function(a){a&&_.deepExtend(this,a),this.yAxisW=Math.max(this.yAxisW,this.leftDisX),this.w=this.graphw-this.yAxisW,null==this.pos.x&&(this.pos.x=this.yAxisW+this.disOriginX),null==this.pos.y&&(this.pos.y=this.graphh-this.h),this.xGraphsWidth=this.w-this._getXAxisDisLine()-this.xGraphsWidth%_.flatten(this.dataOrg).length,this._label&&(this.isH?this.xGraphsWidth-=this._label.getTextHeight()+5:this.xGraphsWidth-=this._label.getTextWidth()+5),this.disOriginX=parseInt((this.w-this.xGraphsWidth)/2)},_trimXAxis:function(a,b){for(var c=[],d=b/(a.length+1),e=0,f=a.length;f>e;e++){var g={content:a[e],x:parseInt(d*(e+1))};c.push(g)}return c},_formatDataSectionText:function(a){a||(a=this.dataSection);var b=this,c=[];return _.each(a,function(a){c.push(b._getFormatText(a))}),c},_getXAxisDisLine:function(){var a=this.disXAxisLine,b=2*a,c=a;return c=a+this.w%_.flatten(this.dataOrg).length,c=c>b?b:c,c=isNaN(c)?0:c},_setXAxisHeight:function(){if(this.enabled){var b=new a.Display.Text(this._layoutDataSection[0]||"test",{context:{fontSize:this.text.fontSize}});if(this.maxTxtH=b.getTextHeight(),this.text.rotation)if(this.text.rotation%90==0)this.h=this._textMaxWidth+this.line.height+this.disY+this.dis+3;else{var c=Math.sin(Math.abs(this.text.rotation)*Math.PI/180),d=Math.cos(Math.abs(this.text.rotation)*Math.PI/180);this.h=c*this._textMaxWidth+b.getTextHeight()+5,this.leftDisX=d*b.getTextWidth()+8}else this.h=this.disY+this.line.height+this.dis+this.maxTxtH,this.leftDisX=b.getTextWidth()/2}else this.dis=0,this.h=3},_getFormatText:function(a){var b;return b=_.isFunction(this.text.format)?this.text.format(a):a,_.isArray(b)&&(b=d.numAddSymbol(b)),b||(b=a),b},_widget:function(){var d=this.layoutData;this._label&&(this._label.context.x=this.xGraphsWidth+5,this.sprite.addChild(this._label));for(var e=0,f=d.length;f>e;e++){var g=new a.Display.Sprite({id:"xNode"+e}),h=d[e],i=h.x,j=this.disY+this.line.height+this.dis,k=new a.Display.Text(h.layoutText||h.content,{id:"xAxis_txt_"+b.getUID(),context:{x:i,y:j+20,fillStyle:this.text.fillStyle,fontSize:this.text.fontSize,rotation:-Math.abs(this.text.rotation),textAlign:this.text.textAlign||(this.text.rotation?"right":"center"),textBaseline:this.text.rotation?"middle":"top",globalAlpha:0}});if(g.addChild(k),this.text.rotation&&90!=this.text.rotation&&(k.context.x+=5,k.context.y+=3),this.line.enabled){var l=new c({context:{x:i,y:this.disY,xEnd:0,yEnd:this.line.height+this.disY,lineWidth:this.line.width,strokeStyle:this.line.strokeStyle}});g.addChild(l)}_.isFunction(this.filter)&&this.filter({layoutData:d,index:e,txt:k,line:l||null}),this.sprite.addChild(g),this.animation?k.animate({globalAlpha:1,y:k.context.y-20},{duration:500,easing:"Back.Out",delay:80*e,id:k.id}):(k.context.y=k.context.y-20,k.context.globalAlpha=1)}},_layout:function(){if(0!=this.sprite.getNumChildren()){var a=this.sprite.getChildAt(this.sprite.getNumChildren()-1).getChildAt(0);if(a){var b=a.context;if("center"==b.textAlign&&b.x+a.context.width/2>this.w&&(b.x=this.w-a.context.width/2),"left"==b.textAlign&&b.x+a.context.width>this.w&&(b.x=this.w-a.context.width),this.data.length>2){var c=this.sprite.getChildAt(this.sprite.getNumChildren()-2).getChildAt(0),d=c.context;d.visible&&b.x<d.x+d.width&&(b.visible=!1)}}}},_setTextMaxWidth:function(){for(var b=this._layoutDataSection,c=b[0],d=0,e=b.length;e>d;d++)b[d].length>c.length&&(c=b[d]);var f=new a.Display.Text(c||"test",{context:{fillStyle:this.text.fillStyle,fontSize:this.text.fontSize}});return this._textMaxWidth=f.getTextWidth(),this._textMaxHeight=f.getTextHeight(),this._textMaxWidth},_trimLayoutData:function(){var a=[],b=this.data,c=this._textMaxWidth+10;this.text.rotation&&(c=1.5*this._textMaxHeight);var d=Math.min(Math.floor(this.w/c),b.length-1);if(d>=b.length-1)this.layoutData=b;else{for(var e=Math.max(Math.ceil(b.length/d-1),0),f=0;d>f;f++){var g=b[f+e*f];g&&a.push(g)}this.layoutData=a}}},e}),define("chartx/components/yaxis/yAxis",["canvax/index","canvax/core/Base","canvax/shape/Line","chartx/utils/tools","chartx/utils/datasection"],function(a,b,c,d,e){var f=function(a,b,c){this.w=0,this.enabled=1,this.dis=6,this.field=null,this.label="",this._label=null,this.line={enabled:1,width:4,lineWidth:1,strokeStyle:"#cccccc"},this.text={fillStyle:"#999",fontSize:12,format:null,rotation:0},this.pos={x:0,y:0},this.place="left",this.biaxial=!1,this.layoutData=[],this.dataSection=[],this.dataOrg=[],this.sprite=null,this.disYAxisTopLine=6,this.yMaxHeight=0,this.yGraphsHeight=0,this.baseNumber=null,this.basePoint=null,this.filter=null,this.isH=!1,this.animation=!0,this.sort=null,this.init(a,b,c)};return f.prototype={init:function(b,c,d){_.deepExtend(this,b),0!=this.text.rotation&&this.text.rotation%90==0&&(this.isH=!0),this._initData(c,d),this.sprite=new a.Display.Sprite},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},setAllStyle:function(a){_.each(this.sprite.children,function(b){_.each(b.children,function(b){"text"==b.type?b.context.fillStyle=a:"line"==b.type&&(b.context.strokeStyle=a)})})},resetData:function(a,b){b&&_.deepExtend(this,b),this.sprite.removeAllChildren(),this.dataSection=[],this._initData(a),this.draw()},update:function(a,b){this.sprite.removeAllChildren(),this.dataSection=[],_.deepExtend(this,a),this._initData(b),this.draw()},_getLabel:function(){this.label&&""!=this.label&&(this._label=new a.Display.Text(this.label,{context:{fontSize:this.text.fontSize,textAlign:"left",textBaseline:this.isH?"top":"bottom",fillStyle:this.text.fillStyle,rotation:this.isH?-90:0}}))},draw:function(a){a&&_.deepExtend(this,a),this._getLabel(),this.yGraphsHeight=this.yMaxHeight-this._getYAxisDisLine(),this._label&&(this.isH?this.yGraphsHeight-=this._label.getTextWidth():this.yGraphsHeight-=this._label.getTextHeight(),this._label.context.y=-this.yGraphsHeight-5),this.setX(this.pos.x),this.setY(this.pos.y),this._trimYAxis(),this._widget()},_trimYAxis:function(){for(var a=this.dataSection[this.dataSection.length-1],b=[],c=0,d=this.dataSection.length;d>c;c++){var e=-(this.dataSection[c]-this._bottomNumber)/(a-this._bottomNumber)*this.yGraphsHeight;e=isNaN(e)?0:parseInt(e),b[c]={content:this.dataSection[c],y:e}}this.layoutData=b;var f=-(this.baseNumber-this._bottomNumber)/(a-this._bottomNumber)*this.yGraphsHeight;f=isNaN(f)?0:parseInt(f),this.basePoint={content:this.baseNumber,y:f}},_getYAxisDisLine:function(){var a=this.disYAxisTopLine,b=2*a,c=a;return c=a+this.yMaxHeight%this.dataSection.length,c=c>b?b:c},_setDataSection:function(a){var b=[];return this.biaxial?"left"==this.place?(b=_.flatten(a.org[0]),this.field=_.flatten([this.field[0]])):(b=_.flatten(a.org[1]),this.field=_.flatten([this.field[1]])):b=_.flatten(a.org),b},_initData:function(a,b){var c=this._setDataSection(a,b);if(this.dataOrg=a.org,0==this.dataSection.length&&(this.dataSection=e.section(c,3)),0==this.dataSection.length&&(this.dataSection=[0]),this.sort){var d="asc";if(_.isString(this.sort)&&(d=this.sort),_.isArray(this.sort)){var f=0;"right"==this.place&&(f=1),this.sort[f]&&(d=this.sort[f])}"desc"==d&&this.dataSection.reverse()}this._bottomNumber=this.dataSection[0],null==this.baseNumber&&(this.baseNumber=this._bottomNumber>0?this._bottomNumber:0)},resetWidth:function(a){var b=this;b.w=a,b.line.enabled?b.sprite.context.x=a-b.dis-b.line.width:b.sprite.context.x=a-b.dis},_widget:function(){var e=this;if(!e.enabled)return void(e.w=0);var f=this.layoutData,g=0;e._label&&e.sprite.addChild(e._label);for(var h=0,i=f.length;i>h;h++){var j=f[h],k=0,l=j.y,m=j.content;m=_.isFunction(e.text.format)?e.text.format(m,e):d.numAddSymbol(m);var n=new a.Display.Sprite({id:"yNode"+h}),o="left"==e.place?"right":"left";(90==e.text.rotation||-90==e.text.rotation)&&(o="center",h==f.length-1&&(o="right"));var p=l+(0==h?-3:0)+(h==f.length-1?3:0);(90==e.text.rotation||-90==e.text.rotation)&&(h==f.length-1&&(p=l-2),0==h&&(p=l));var q=new a.Display.Text(m,{id:"yAxis_txt_"+b.getUID(),context:{x:k+("left"==e.place?-5:5),y:p+20,fillStyle:e.text.fillStyle,fontSize:e.text.fontSize,rotation:-Math.abs(this.text.rotation),textAlign:o,textBaseline:"middle",globalAlpha:0}});if(n.addChild(q),g=Math.max(g,q.getTextWidth()),(90==e.text.rotation||-90==e.text.rotation)&&(g=Math.max(g,q.getTextHeight())),e.line.enabled){var r=new c({context:{x:0+("left"==e.place?1:-1)*e.dis-2,y:l,xEnd:e.line.width,yEnd:0,lineWidth:e.line.lineWidth,strokeStyle:e.line.strokeStyle}});n.addChild(r)}_.isFunction(e.filter)&&e.filter({layoutData:e.layoutData,index:h,txt:q,line:r}),e.sprite.addChild(n),
e.animation?q.animate({globalAlpha:1,y:q.context.y-20},{duration:500,easing:"Back.Out",delay:80*h,id:q.id}):(q.context.y=q.context.y-20,q.context.globalAlpha=1)}g+=e.dis,e.sprite.context.x=g+e.pos.x,e.line.enabled?e.w=g+e.dis+e.line.width+e.pos.x:e.w=g+e.dis+e.pos.x}},f});