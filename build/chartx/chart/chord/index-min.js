define("chartx/chart/chord/index",["canvax/index","chartx/chart/index","canvax/shape/Sector","canvax/shape/Path","canvax/animation/Tween","chartx/layout/chord"],function(a,b,c,d,e,f){return b.extend({chord:null,init:function(a,b,c){this.barWidth=15,this.r=0,this.matrix=[],this.color=["#42a8d7","#666666","#26b471","#7aa1ff","#fa8529","#ff7c4d","#2494ed","#7aa1ff","#fa8529","#ff7c4d"],_.deepExtend(this,c),this.chord=f.chord().padding(.05).matrix(this.matrix)},draw:function(a){this._widget(),this.inited=!0},_widget:function(){var b={x:this.width/2,y:this.height/2};this.r=Math.min(this.width,this.height)/2-3,this.groups=new a.Display.Sprite,this.chords=new a.Display.Sprite({context:{x:b.x,y:b.y}}),this.stage.addChild(this.chords),this.stage.addChild(this.groups);var d=this;_.each(this.chord.groups(),function(a,e){var f=new c({context:{x:b.x,y:b.y,r0:d.r-d.barWidth,r:d.r,startAngle:180*a.startAngle/Math.PI,endAngle:180*a.endAngle/Math.PI,fillStyle:d.color[e],lineWidth:1,strokeStyle:d.color[e],cursor:"pointer"},id:"sector"+e});d.groups.addChild(f),f.group=a,f.hover(function(a){var b=this.group;_.each(d.chords.children,function(a){a.chord.source.index!=b.index&&a.chord.target.index!=b.index&&(a.context.globalAlpha=.1)})},function(a){this.chord;_.each(d.chords.children,function(a){a.context.globalAlpha=.5})})}),_.each(this.chord.chords(),function(a){d.chords.addChild(d._getChordPath(a))})},_getChordPath:function(a,b){var c=this,e="",f=c.r-c.barWidth,g=c._getPointFromAng(a.source.startAngle),h=c._getPointFromAng(a.source.endAngle),i=c._getPointFromAng(a.target.startAngle),j=c._getPointFromAng(a.target.endAngle);e+="M"+g.x+" "+g.y,e+="A "+f+" "+f+" 0 0 1 "+h.x+" "+h.y,e+="Q 0 0 "+i.x+" "+i.y,e+="A "+f+" "+f+" 0 0 1 "+j.x+" "+j.y,e+="Q 0 0 "+g.x+" "+g.y,e+="z";var k=new d({context:{path:e,fillStyle:c.color[a.target.index],strokeStyle:"#999",lineWidth:1,globalAlpha:.5}});return k.chord=a,k},_getPointFromAng:function(a){var b=this,c=b.r-b.barWidth;return{x:c*Math.cos(a),y:c*Math.sin(a)}}})});