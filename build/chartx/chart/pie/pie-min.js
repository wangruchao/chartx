define("chartx/chart/pie/pie",["canvax/index","canvax/shape/Sector","canvax/shape/Line","canvax/shape/BrokenLine","canvax/shape/Rect","chartx/utils/tools","canvax/animation/Tween","chartx/components/tips/tip"],function(Canvax,Sector,Line,BrokenLine,Rect,Tools,Tween,Tip){var Pie=function(a,b,c){this.data=null,this.sprite=null,this.branchSp=null,this.branchTxtSp=null,this.dataLabel={enabled:!0},this.tips=_.deepExtend({enabled:!0},b),this.domContainer=c,this._tip=null,this.init(a),this.colorIndex=0,this.sectors=[],this.isMoving=!1};return Pie.prototype={init:function(a){_.deepExtend(this,a),this.sprite=new Canvax.Display.Sprite,this._tip=new Tip(this.tips,this.domContainer),this._tip._getDefaultContent=this._getTipDefaultContent,this.sprite.addChild(this._tip.sprite),this.dataLabel.enabled&&(this.branchSp=new Canvax.Display.Sprite,this.branchTxtSp=new Canvax.Display.Sprite),this._configData(),this._configColors()},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},_configData:function(){var a=this;a.total=0,a.currentAngle=0,a.labelFontSize=12*a.boundWidth/1e3;var b=a.data.data;if(a.clickMoveDis=a.r/8,b.length&&b.length>0)if(1==b.length)_.extend(b[0],{start:0,end:360,percentage:100,txt:"100%",isMax:!0});else{for(var c=0;c<b.length;c++)a.total+=b[c].y;if(a.total>0){for(var d=0,e=0;e<b.length;e++){e>0&&100*f>b[d].percentage&&(d=e);var f=b[e].y/a.total,g=360*f,h=a.currentAngle+g>360?360:a.currentAngle+g,i=Math.cos((a.currentAngle+g/2)/180*Math.PI),j=Math.sin((a.currentAngle+g/2)/180*Math.PI),k=a.currentAngle+g/2;i=i.toFixed(5),j=j.toFixed(5);var l=function(a){return a>360&&(a=360),a>=0&&90>=a?1:a>90&&180>=a?2:a>180&&270>=a?3:a>270&&360>=a?4:void 0}(k);_.extend(b[e],{start:a.currentAngle,end:h,midAngle:k,outOffsetx:a.clickMoveDis*i,outOffsety:a.clickMoveDis*j,centerx:(a.r-a.clickMoveDis)*i,centery:(a.r-a.clickMoveDis)*j,outx:(a.r+a.clickMoveDis)*i,outy:(a.r+a.clickMoveDis)*j,edgex:(a.r+2*a.clickMoveDis)*i,edgey:(a.r+2*a.clickMoveDis)*j,percentage:(100*f).toFixed(1),txt:(100*f).toFixed(1)+"%",quadrant:l,labelDirection:1==l||4==l?1:0,index:e,isMax:!1}),a.currentAngle+=g,a.currentAngle>360&&(a.currentAngle=360)}b[d].isMax=!0}}},getList:function(){var a=this,b=[];return a.sectors&&a.sectors.length>0&&(b=a.sectors),b},showHideSector:function(a){var b=this,c=b.sectorMap;c[a]&&(c[a].visible?b._hideSector(a):b._showSector(a))},slice:function(a){var b=this,c=b.sectorMap;c[a]&&!b.isMoving&&b.moveSector(c[a].sector)},getTopAndBottomIndex:function(){var a,b,c=self.data,d={},e=270,f=90,g=90,h=90;return c.length>0&&_.each(self.data,function(){1==c.quadrant||2==c.quadrant?(b=Math.abs(c.middleAngle-f),h>b&&(d.bottomIndex=c.index,h=b)):(3==c.quadrant||4==c.quadrant)&&(a=Math.abs(c.middleAngle-e),g>a&&(d.topIndex=c.index,g=a))}),d},getColorByIndex:function(a,b){return b>=a.length&&((this.data.data.length-1)%a.length==0&&b%a.length==0?b=b%a.length+1:b%=a.length),a[b]},_configColors:function(){var a=["#FF7D00","#516DCC","#8ACC5F","#A262CB","#FFD202","#CC3E3C","#00A5FF","#009964","#CCB375","#694C99"];this.colors=this.colors?this.colors:a},draw:function(a){var b=this;b.setX(b.x),b.setY(b.y),b._widget(),a.animation&&b.grow(),a.complete&&a.complete.call(b)},moveSector:function(a){function b(){e=requestAnimationFrame(b),Tween.update()}if(a){{var c=this,d=c.data.data,e=null;new Tween.Tween({percent:0}).to({percent:1},200).easing(Tween.Easing.Quadratic.InOut).onUpdate(function(){var b=this;_.each(c.sectors,function(c){c.context&&(c.index!=a.__dataIndex||c.sector.__isSelected?c.sector.__isSelected&&(c.context.x=d[c.sector.__dataIndex].outOffsetx*(1-b.percent),c.context.y=d[c.sector.__dataIndex].outOffsety*(1-b.percent)):(c.context.x=d[c.sector.__dataIndex].outOffsetx*b.percent,c.context.y=d[c.sector.__dataIndex].outOffsety*b.percent))})}).onComplete(function(){cancelAnimationFrame(e),_.each(c.sectors,function(b){b.sector&&(b=b.sector,b.__dataIndex!=a.__dataIndex||b.__isSelected?b.__isSelected&&(b.__isSelected=!1):b.__isSelected=!0)}),c.isMoving=!1}).start()}c.isMoving=!0,b()}},grow:function(){function a(){c=requestAnimationFrame(a),Tween.update()}var b=this,c=null;_.each(b.sectors,function(a){a.context&&(a.context.r0=0,a.context.r=0,a.context.startAngle=0,a.context.endAngle=0)}),b._hideDataLabel();var d=function(){new Tween.Tween({process:0,r:0,r0:0}).to({process:1,r:b.r,r0:b.r0},800).onUpdate(function(){for(var a=this,c=0;c<b.sectors.length;c++)if(b.sectors[c].context)if(b.sectors[c].context.r=a.r,b.sectors[c].context.r0=a.r0,b.sectors[c].context.globalAlpha=a.process,0==c)b.sectors[c].context.startAngle=b.sectors[c].startAngle,b.sectors[c].context.endAngle=b.sectors[c].endAngle*a.process;else{var d=function(a){var c=a-1;return 0==c?b.sectors[c].context?b.sectors[c].context.endAngle:0:b.sectors[c].context?b.sectors[c].context.endAngle:arguments.callee(c)}(c);b.sectors[c].context.startAngle=d,b.sectors[c].context.endAngle=b.sectors[c].context.startAngle+(b.sectors[c].endAngle-b.sectors[c].startAngle)*a.process}}).onComplete(function(){cancelAnimationFrame(c),b.isMoving=!1,b._showDataLabel()}).start();a()};b.isMoving=!0,d()},_showDataLabel:function(){this.branchSp&&this.branchTxtSp&&(this.branchSp.context.globalAlpha=1,this.branchTxtSp.context.globalAlpha=1)},_hideDataLabel:function(){this.branchSp&&this.branchTxtSp&&(this.branchSp.context.globalAlpha=0,this.branchTxtSp.context.globalAlpha=0)},_showTip:function(a,b){this._tip.show(this._getTipsInfo(a,b))},_hideTip:function(a){this._tip.hide(a)},_moveTip:function(a,b){this._tip.move(this._getTipsInfo(a,b))},_getTipDefaultContent:function(a){return"<div style='color:"+a.fillStyle+"'><div style='padding-bottom:3px;'>"+a.name+"\uff1a"+a.value+"</div>"+parseInt(a.percentage)+"%</div>"},_getTipsInfo:function(a,b){var c=this.data.data[b],d=this.getColorByIndex(this.colors,b);return a.tipsInfo={iNode:b,name:c.name,percentage:c.percentage,value:c.y,fillStyle:d,data:this.data.org[b]},a},_hideSector:function(a){this.sectorMap[a]&&(this.sectorMap[a].context.visible=!1,this.sectorMap[a].visible=!1,this._hideLabel(a))},_showSector:function(a){this.sectorMap[a]&&(this.sectorMap[a].context.visible=!0,this.sectorMap[a].visible=!0,this._showLabel(a))},_sectorFocus:function(a){this.sectorMap[a]&&this.focusCallback&&this.focusCallback.focus(a)},_sectorUnfocus:function(){this.focusCallback&&this.focusCallback.unfocus()},_getByIndex:function(a){return this.sectorMap[a]},_widgetLabel:function(quadrant,indexs,lmin,rmin){var self=this,data=self.data.data,sectorMap=self.sectorMap,minTxtDis=20,labelOffsetX=5,outCircleRadius=self.r+2*self.clickMoveDis,currentIndex,baseY,clockwise,isleft,minPercent,currentY,adjustX,txtDis,bkLineStartPoint,bklineMidPoint,bklineEndPoint,branchLine,brokenline,branchTxt,bwidth,bheight,bx,by;for(clockwise=2==quadrant||4==quadrant,isleft=2==quadrant||3==quadrant,isup=3==quadrant||4==quadrant,minPercent=isleft?lmin:rmin,i=0;i<indexs.length;i++)if(currentIndex=indexs[i],!(0!=data[currentIndex].y&&data[currentIndex].percentage<=minPercent)){currentY=data[currentIndex].edgey,adjustX=Math.abs(data[currentIndex].edgex),txtDis=currentY-baseY,0!=i&&(Math.abs(txtDis)<minTxtDis||isup&&0>txtDis||!isup&&txtDis>0)&&(currentY=isup?baseY+minTxtDis:baseY-minTxtDis,outCircleRadius-Math.abs(currentY)>0&&(adjustX=Math.sqrt(Math.pow(outCircleRadius,2)-Math.pow(currentY,2))),(isleft&&-adjustX>data[currentIndex].edgex||!isleft&&adjustX<data[currentIndex].edgex)&&(adjustX=Math.abs(data[currentIndex].edgex))),bkLineStartPoint=[data[currentIndex].outx,data[currentIndex].outy],bklineMidPoint=[isleft?-adjustX:adjustX,currentY],bklineEndPoint=[isleft?-adjustX-labelOffsetX:adjustX+labelOffsetX,currentY],baseY=currentY,branchLine=new Line({context:{xStart:data[currentIndex].centerx,yStart:data[currentIndex].centery,xEnd:data[currentIndex].outx,yEnd:data[currentIndex].outy,lineWidth:1,strokeStyle:sectorMap[currentIndex].color,lineType:"solid"}}),brokenline=new BrokenLine({context:{lineType:"solid",smooth:!1,pointList:[bkLineStartPoint,bklineMidPoint,bklineEndPoint],lineWidth:1,strokeStyle:sectorMap[currentIndex].color}});var labelTxt="",formatReg=/\{.+?\}/g,point=data[currentIndex];switch(labelTxt=self.dataLabel.format?self.dataLabel.format.replace(formatReg,function(match,index){var matchStr=match.replace(/\{([\s\S]+?)\}/g,"$1"),vals=matchStr.split("."),obj=eval(vals[0]),pro=vals[1];return obj[pro]}):data[currentIndex].name+" : "+data[currentIndex].txt,branchTxt=new Canvax.Display.Text(labelTxt,{context:{x:data[currentIndex].edgex,y:data[currentIndex].edgey,fontSize:self.labelFontSize,fontWeight:"normal",fillStyle:sectorMap[currentIndex].color}}),bwidth=branchTxt.getTextWidth(),bheight=branchTxt.getTextHeight(),bx=isleft?-adjustX:adjustX,by=currentY,quadrant){case 1:bx+=labelOffsetX,by-=bheight/2;break;case 2:bx-=bwidth+labelOffsetX,by-=bheight/2;break;case 3:bx-=bwidth+labelOffsetX,by-=bheight/2;break;case 4:bx+=labelOffsetX,by-=bheight/2}branchTxt.context.x=bx,branchTxt.context.y=by,self.branchSp.addChild(branchLine),self.branchSp.addChild(brokenline),self.branchTxtSp.addChild(branchTxt),self.sectorMap[currentIndex].label={line1:branchLine,line2:brokenline,label:branchTxt}}},_hideLabel:function(a){if(this.sectorMap[a]){var b=this.sectorMap[a].label;b.line1.context.visible=!1,b.line2.context.visible=!1,b.label.context.visible=!1}},_showLabel:function(a){if(this.sectorMap[a]){var b=this.sectorMap[a].label;b.line1.context.visible=!0,b.line2.context.visible=!0,b.label.context.visible=!0}},_startWidgetLabel:function(){for(var a=this,b=a.data.data,c=0,d=0,e=[],f=[{indexs:[],count:0},{indexs:[],count:0},{indexs:[],count:0},{indexs:[],count:0}],g={right:{startQuadrant:4,endQuadrant:1,clockwise:!0,indexs:[]},left:{startQuadrant:3,endQuadrant:2,clockwise:!1,indexs:[]}},h=0;h<b.length;h++){var i=b[h].quadrant;f[i-1].indexs.push(h),f[i-1].count++}f[0].count>1&&f[0].indexs.reverse(),f[2].count>1&&f[2].indexs.reverse(),f[0].count>f[3].count&&(g.right.startQuadrant=1,g.right.endQuadrant=4,g.right.clockwise=!1),f[1].count>f[2].count&&(g.left.startQuadrant=2,g.left.endQuadrant=3,g.left.clockwise=!0),g.right.indexs=f[g.right.startQuadrant-1].indexs.concat(f[g.right.endQuadrant-1].indexs),g.left.indexs=f[g.left.startQuadrant-1].indexs.concat(f[g.left.endQuadrant-1].indexs);var j,k;for(g.right.indexs.length>15&&(k=g.right.indexs.slice(0),k.sort(function(a,c){return b[c].percentage-b[a].percentage}),j=k.slice(15),c=b[j[0]].percentage),g.left.indexs.length>15&&(k=g.left.indexs.slice(0),k.sort(function(a,c){return b[c].percentage-b[a].percentage}),j=k.slice(15),d=b[j[0]].percentage),e.push(g.right.startQuadrant),e.push(g.left.startQuadrant),e.push(g.right.endQuadrant),e.push(g.left.endQuadrant),h=0;h<e.length;h++)a._widgetLabel(e[h],f[e[h]-1].indexs,d,c)},_widget:function(){var a,b=this,c=b.data.data;if(c.length>0&&b.total>0){b.branchSp&&b.sprite.addChild(b.branchSp),b.branchTxtSp&&b.sprite.addChild(b.branchTxtSp);for(var d=0;d<c.length;d++){b.colorIndex>=b.colors.length&&(b.colorIndex=0);var e=b.getColorByIndex(b.colors,d);if(c[d].end>c[d].start){var f=new Sector({context:{x:c[d].selected?c[d].outOffsetx:0,y:c[d].selected?c[d].outOffsety:0,r0:b.r0,r:b.r,startAngle:c[d].start,endAngle:c[d].end,fillStyle:e,index:c[d].index,lineWidth:b.strokeWidth,strokeStyle:"#fff"},id:"sector"+d});f.__data=c[d],f.__colorIndex=d,f.__dataIndex=d,f.__isSelected=c[d].selected,f.hover(function(a){b.isMoving||(b.tips.enabled&&b._showTip(a,this.__dataIndex),b._sectorFocus(this.__dataIndex))},function(a){b.isMoving||(b.tips.enabled&&b._hideTip(a),b._sectorUnfocus())}),f.on("mousemove",function(a){b.tips.enabled&&b._moveTip(a,this.__dataIndex)}),f.on("click",function(){var a=this;b.isMoving||b.allowPointSelect&&b.moveSector(a)}),b.sprite.addChild(f),a={name:c[d].name,sector:f,context:f.context,originx:f.context.x,originy:f.context.y,r:b.r,startAngle:f.context.startAngle,endAngle:f.context.endAngle,color:e,index:d,percentage:c[d].percentage,visible:!0},b.sectors.push(a)}else c[d].end==c[d].start&&b.sectors.push({name:c[d].name,sector:null,context:null,originx:0,originy:0,r:b.r,startAngle:c[d].start,endAngle:c[d].end,color:e,index:d,percentage:0,visible:!0})}if(b.sectors.length>0){b.sectorMap={};for(var d=0;d<b.sectors.length;d++)b.sectorMap[b.sectors[d].index]=b.sectors[d]}b.dataLabel.enabled&&b._startWidgetLabel()}}},Pie});