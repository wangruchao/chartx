define("chartx/chart/original/relcircle/layout",[],function(){return function(a,b){var c={w:0,h:0,groupSort:null,node:{r:25,fillStyle:"#67b1e6"},edge:{lineWidth:6,fillStyle:"#999"}};_.deepExtend(c,b);var d=2*Math.PI/a.nodesLen,e={w:c.w-2*c.node.r,h:c.h-2*c.node.r},f=Math.min(e.w,e.h)/2,g=0;for(var h in a.nodes){var i=a.nodes[h];i.pos={x:c.w/2+f*Math.cos(g*d),y:c.h/2+f*Math.sin(g*d)},i.r=c.node.r,i.fillStyle=c.node.fillStyle,g++}for(var j in a.edges){var k=a.edges[j];k.value=k.value,k.lineWidth=c.edge.lineWidth,k.fillStyle=c.edge.fillStyle,k.from=a.nodes[j.split(/[_-]/)[0]],k.to=a.nodes[j.split(/[_-]/)[1]]}return a}});