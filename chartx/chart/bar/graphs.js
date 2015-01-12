define(
    "chartx/chart/bar/graphs",
    [
        "canvax/index",
        "canvax/shape/Rect",
        "canvax/animation/Tween",
        "chartx/components/tips/tip"
    ],
    function(Canvax , Rect , Tween , Tip ){
 
        var Graphs = function( opt , tips , domContainer ){
            this.w = 0;
            this.h = 0;
           
            this.pos = {
                x : 0,
                y : 0
            }
    
            this._colors = ["#6f8cb2" , "#c77029" , "#f15f60" , "#ecb44f" , "#ae833a" , "#896149"];
    
            this.bar = {
                width : 12
            }

            this.eventEnabled = true;
    
            this.sprite = null ;
    
            this.yDataSectionLen = 0; //y轴方向有多少个section
    
            _.deepExtend(this , opt);
    
            this._tip = new Tip( tips , domContainer );
            
            this.init( );
        };
    
        Graphs.prototype = {
            init : function( ){
                this.sprite = new Canvax.Display.Sprite({ id : "graphsEl" });
            },
            setX:function($n){
                this.sprite.context.x = $n
            },
            setY:function($n){
                this.sprite.context.y = $n
            },
            getBarFillStyle : function( i , ii , value){
                var barFillStyle = null;
                if( _.isArray( this.bar.fillStyle ) ){
                    barFillStyle = this.bar.fillStyle[ii]
                }
                if( _.isFunction( this.bar.fillStyle ) ){
                    barFillStyle = this.bar.fillStyle( i , ii , value );
                }
                if( !barFillStyle || barFillStyle=="" ){
                    barFillStyle = this._colors[ii];
                }
                return barFillStyle;
            },
            checkBarW : function( xDis ){
                if( this.bar.width >= xDis ){
                    this.bar.width = xDis-1 > 1 ? xDis - 1 : 1;
                }

            },
            draw : function(data , opt){
            
                _.deepExtend(this , opt);
                if( data.length == 0 ){
                    return;
                }
    
                this.data = data;
    
                //这个分组是只x方向的一维分组
                var barGroupLen = data[0].length;

    
                for( var i = 0 ; i < barGroupLen ; i++ ){
                    var sprite      = new Canvax.Display.Sprite({ id : "barGroup"+i });
                    var spriteHover = new Canvax.Display.Sprite({ id : "barGroupHover"+i });
                    for( var ii = 0 , iil = data.length ; ii < iil ; ii++ ){
                        var barData = data[ii][i];

                        var fillStyle = this.getBarFillStyle( i , ii , barData.value );
                        var barH      = parseInt(Math.abs(barData.y));
                        var radiusR   = Math.min( this.bar.width/2 , barH );
                        var rect = new Rect({
                            id : "bar_"+ii+"_"+i,
                            context : {
                                x         : Math.round(barData.x - this.bar.width/2),
                                y         : parseInt(barData.y),
                                width     : parseInt(this.bar.width),
                                height    : barH,
                                fillStyle : fillStyle,
                                radius    : [radiusR , radiusR, 0 , 0]
                             }
                        });
    
                        var itemSecH   = this.h/( this.yDataSectionLen - 1 );
                        var hoverRectH = Math.ceil(barH/itemSecH) * itemSecH;
                        var hoverRect  = new Rect({
                            id : "bar_"+ii+"_"+i+"hover",
                            context : {
                                x           : Math.round(barData.x - this.bar.width/2),
                                y           : -hoverRectH,
                                width       : parseInt(this.bar.width),
                                height      : hoverRectH,
                                fillStyle   : "black",
                                globalAlpha : 0,
                                cursor      : "pointer"
                            }
                        }); 
    
                        hoverRect.target = rect;
                        hoverRect.row    = i;
                        hoverRect.column = ii;

                        if( this.eventEnabled ) {
                            var me = this;
                            hoverRect.on("mouseover" , function(e){
                                var target    = this.target.context;
                                target.x      --;
                                target.width  += 2;

                                me.sprite.addChild(me._tip.sprite);
                                me._tip.show( me._setTipInfoHandler(e , this.row , this.column ) );

                            }); 
                            hoverRect.on("mousemove" , function(e){
                                me._tip.move( me._setTipInfoHandler(e , this.row , this.column ) );
                            }); 
                            hoverRect.on("mouseout" , function(e){
                                var target    = this.target.context;
                                target.x      ++;
                                target.width  -= 2;
                                me._tip.hide(e);
                                me.sprite.removeChild(me._tip.sprite);
                            }); 
                        }
    
                        sprite.addChild( rect );
                        spriteHover.addChild( hoverRect );
                    }
                    this.sprite.addChild( sprite );
                    this.sprite.addChild( spriteHover );
                }
    
                this.sprite.context.x = this.pos.x;
                this.sprite.context.y = this.pos.y;
            },
            /**
             * 生长动画
             */
            grow : function(){
                var self  = this;
                var timer = null;
                var growAnima = function(){
                   var bezierT = new Tween.Tween( { h : 0 } )
                   .to( { h : self.h }, 500 )
                   .onUpdate( function (  ) {
                       self.sprite.context.scaleY = this.h / self.h;
                   } ).onComplete( function(){
                       cancelAnimationFrame( timer );
                   }).start();
                   animate();
                };
                function animate(){
                    timer    = requestAnimationFrame( animate ); 
                    Tween.update();
                };
                growAnima();
            },
            _setTipInfoHandler : function(e  , iNode ,iGroup){
                e.tipsInfo = {
                    iGroup        : iGroup,
                    iNode         : iNode,
                    nodesInfoList : this._getNodeInfo(iNode)
                };
                return e;
            },
            _getNodeInfo : function( iNode ){
                var arr = [];
                var me  = this;
                _.each( this.data , function( group , i ){
                    var node = _.clone(group[iNode]);
                    node.fillStyle = me.getBarFillStyle( iNode , i , node.value );
                    arr.push(node);
                } );
                return arr;
            }
        }; 
    
        return Graphs;
    } 
)
