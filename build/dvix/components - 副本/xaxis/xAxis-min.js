KISSY.add("dvix/components/xaxis/xAxis",function(a,b){var c=b.Canvax,d=function(a,b){this.chart=a,this.field=b.field||null,this.TextStyle=b.TextStyle||null,this.lineColor=b.lineColor||"#D6D6D6",this.customPL=b.customPL||null,this.dataOrg=[],this.data=[],this.xPointList=[],this.sprite=null};return d.prototype={getxAxisData:function(){var a=this,b=a.chart.data;a.field||(a.field=b[0][0]),a.dataOrg.length=0;for(var c=1,d=b.length;d>c;c++)a.dataOrg.push(b[c][a.chart.fieldList[a.field].index])},xAxisLayout:function(){var a=this,b=a.chart.yAxis.sprite.context,d=Math.round(2*a.chart.oneStrSize.en.height);a.sprite=new c.Display.Sprite({context:{x:b.width,y:a.chart.height-d,width:a.chart.width-b.width,height:d}})},getxAxisPoints:function(b){var c=this;if(c.customPL){var d=c.customPL(b),e=parseInt((b.length-1)/(d.length-1));d.constructor==Array&&d.length>0&&a.each(d,function(a,d){var f={x:b[d*e][0],text:a};c.xPointList.push(f)})}0==c.xPointList.length&&a.each(b,function(a,b){c.xPointList.push({x:a[0],text:c.dataOrg[b]})})},xAxisDraw:function(){var b=this,d=(b.sprite.context,b.xPointList.length);a.each(b.xPointList,function(a,e){var f=a.x;b.sprite.addChild(new c.Shapes.Line({context:{xStart:f,yStart:0,xEnd:f,yEnd:5,lineWidth:1,strokeStyle:b.lineColor}}));var g={x:f,y:5,fillStyle:"blank"};e>0&&(g.textAlign="center",e==d-1&&(g.textAlign="right")),b.sprite.addChild(new c.Display.Text(a.text.toString(),{context:g}))})}},d},{requires:["dvix/"]});