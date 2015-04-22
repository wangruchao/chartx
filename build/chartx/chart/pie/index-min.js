define("chartx/chart/pie/index",["chartx/chart/index","chartx/chart/pie/pie"],function(a,b){var c=a.Canvax;return a.extend({init:function(a,b,c){this.config={mode:1,event:{enabled:1}},_.deepExtend(this,c),this.dataFrame=this._initData(b,this)},draw:function(){this.stageBg=new c.Display.Sprite({id:"bg"}),this.core=new c.Display.Sprite({id:"core"}),this.stageTip=new c.Display.Stage({id:"stageTip"}),this.canvax.addChild(this.stageTip),this.stageTip.toFront(),this.stage.addChild(this.core),this._initModule(),this._startDraw(),this._drawEnd(),this._arguments=arguments},getByIndex:function(a){return this._pie._getByIndex(a)},getList:function(){var a,b=this,c=[];if(b._pie){var d=b._pie.getList();if(d.length>0)for(var e=0;e<d.length;e++)a=d[e],c.push({name:a.name,index:a.index,color:a.color,r:a.r,percentage:a.percentage})}return c},show:function(a){this._pie&&this._pie.showHideSector(a)},slice:function(a){this._pie&&this._pie.slice(a)},_initData:function(a,b){var c={};if(c.org=a,c.data=[],_.isArray(a))for(var d=0;d<a.length;d++){var e={};_.isArray(a[d])?(e.name=a[d][0],e.y=parseFloat(a[d][1]),e.sliced=!1,e.selected=!1):"object"==typeof a[d]&&(e.name=a[d].name,e.y=parseFloat(a[d].y),e.sliced=a[d].sliced||!1,e.selected=a[d].selected||!1),e.name&&c.data.push(e)}return c},clear:function(){this.stageBg.removeAllChildren(),this.core.removeAllChildren(),this.stageTip.removeAllChildren()},reset:function(a,b){this.clear(),this.width=parseInt(this.element.width()),this.height=parseInt(this.element.height()),this.draw(a,b)},_initModule:function(){var a=this,c=a.width,d=a.height,e=2*Math.min(c,d)/3/2;a.dataLabel.enabled||(e=Math.min(c,d)/2,e-=e/11);var f=parseInt(a.innerRadius||0),g=2*e/3;f=f>=0?f:0,f=g>=f?f:g;var h=c/2,i=d/2;a.pie={x:h,y:i,r0:f,r:e,boundWidth:c,boundHeight:d,data:a.dataFrame,allowPointSelect:a.allowPointSelect,animation:a.animation,colors:a.colors,focusCallback:{focus:function(b){a.fire("focused")},unfocus:function(){a.fire("unfocused")}}},a.dataLabel&&(a.pie.dataLabel=a.dataLabel),a._pie=new b(a.pie,a.tips,a.canvax.getDomContainer())},_startDraw:function(){this._pie.draw(this)},_drawEnd:function(){this.core.addChild(this._pie.sprite),this._tip&&this.stageTip.addChild(this._tip.sprite),this.fire("complete")}})});