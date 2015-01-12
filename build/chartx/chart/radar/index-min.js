define("chartx/chart/radar/index",["chartx/chart/index","chartx/utils/tools","./xaxis","chartx/components/yaxis/yAxis","./back","./graphs","canvax/geom/HitTestPoint","chartx/utils/deep-extend"],function(a,b,c,d,e,f,g){var h=a.Canvax;return a.extend({init:function(a,b,c){this.r=0,this._xAxis=null,this._yAxis=null,this._back=null,this._graphs=null,this.stageBg=new h.Display.Sprite({id:"bg"}),this.stageCore=new h.Display.Sprite({id:"graph"}),this.stage.addChild(this.stageBg),this.stage.addChild(this.stageCore),_.deepExtend(this,c),this.dataFrame=this._initData(b,this)},_getR:function(){var a=Math.min(this.width,this.height);this.r||(this.r=a/2),this.r>a/2&&(this.r=a/2),this.r-=50},draw:function(){this._getR(),this._initModule(this,this.dataFrame),this._startDraw(),this._drawEnd();var a=this;this.stage.on("mouseover",function(b){a._graphs.angOver(b,a._getCurrAng(b))}),this.stage.on("mousemove",function(b){a._graphs.angMove(b,a._getCurrAng(b))}),this.stage.on("mouseout",function(b){var c=a._back.sprite.getChildById("isogon_"+(a._yAxis.dataSection.length-1)),d=a._getPointBack(b);g.isInside(c,d)||a._graphs.angOut()})},_getCurrAng:function(a){var b=this._getPointBack(a),c=180*Math.atan2(b.y,b.x)/Math.PI,d=360/this._xAxis.dataSection.length;c=(360+c+90+d/2)%360;var e=parseInt(c/d);return e},_getPointBack:function(a){var b=this._back.sprite.globalToLocal(a.target.localToGlobal(a.point,this.sprite));return b.x-=this.r,b.y-=this.r,b},_initModule:function(a,b){this._xAxis=new c(a.xAxis,b.xAxis),this._yAxis=new d(a.yAxis,b.yAxis),this._back=new e(a.back),this._graphs=new f(a.graphs,a.tips,this.canvax.getDomContainer())},_startDraw:function(){var a=this.r,b={r:a,yDataSection:this._yAxis.dataSection,xDataSection:this._xAxis.dataSection};this._back.draw(b);var c=this._back.sprite.context,d=(this.width-c.width)/2,e=(this.height-c.height)/2;this._back.setPosition(d,e),this._graphs.draw(this._yAxis.dataOrg,b),this._graphs.setPosition(d,e),this._xAxis.draw({r:a}),this._xAxis.setPosition(d,e)},_drawEnd:function(){this.stageBg.addChild(this._back.sprite),this.stageCore.addChild(this._xAxis.sprite),this.stageCore.addChild(this._graphs.sprite)}})});