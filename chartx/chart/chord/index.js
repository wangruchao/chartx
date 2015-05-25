define(
    "chartx/chart/chord/index",
    [
        "canvax/index",
        "chartx/chart/index",
        "canvax/shape/Sector",
        "canvax/shape/Path",
        "canvax/animation/Tween",
        "chartx/layout/chord"
    ],
    function( Canvax , Chart , Sector , Path , Tween , Layout ){
     
        return Chart.extend({
            chord  : null,
            init   : function( el ,  data , opts ){
                this.barWidth = 15;
                this.r        = 0;
                this.matrix   = [];
                this.color    = ["#42a8d7",'#666666','#26b471', '#7aa1ff', '#fa8529', '#ff7c4d','#2494ed','#7aa1ff','#fa8529', '#ff7c4d'];

                _.deepExtend(this, opts);
                
                this.chord  = Layout.chord().padding(0.05).matrix( this.matrix );
            },
            draw   : function( opt ){
                this._widget();
            },
            _widget: function(  ){
                var centre = {
                    x : this.width  / 2,
                    y : this.height / 2
                };
                this.r = Math.min( this.width , this.height ) / 2;

                this.groups   = new Canvax.Display.Sprite();
                this.chords   = new Canvax.Display.Sprite({
                    context : {
                        x : centre.x,
                        y : centre.y
                    }
                });

                this.stage.addChild( this.chords );
                this.stage.addChild( this.groups );

                var me = this;

                _.each( this.chord.groups() , function( group , i ){
                    var sector = new Sector({
                        context: {
                            x          : centre.x,
                            y          : centre.y,
                            r0         : me.r - me.barWidth,
                            r          : me.r,
                            startAngle : group.startAngle * 180 / Math.PI ,
                            endAngle   : group.endAngle * 180 / Math.PI ,
                            fillStyle  : me.color[i],
                            lineWidth  : 1,
                            strokeStyle: me.color[i],
                            cursor     : "pointer"
                        },
                        id: 'sector' + i
                    });
                    me.groups.addChild( sector );
                } );

                _.each( this.chord.chords() , function( chord ){
                    me.chords.addChild( me._getChordPath( chord ) );
                } );
            },
            _getChordPath : function( chord , i ){
                var me   = this;

                var path = "";
                var r    = me.r - me.barWidth;

                var p1   = me._getPointFromAng( chord.source.startAngle );
                var p2   = me._getPointFromAng( chord.source.endAngle );
                var p3   = me._getPointFromAng( chord.target.startAngle );
                var p4   = me._getPointFromAng( chord.target.endAngle );

                path += "M"+ p1.x + " " + p1.y;
                path += "A "+r+" "+r+" 0 0 1 "+p2.x+" "+p2.y;
                path += "Q 0 0 "+p3.x+" "+p3.y;
                path += "A "+r+" "+r+" 0 0 1 "+p4.x+" "+p4.y;
                path += "Q 0 0 "+p1.x+" "+p1.y;
                path += "z";

                

                var chordPath = new Path({
                    context : {
                        path        : path,
                        fillStyle   : me.color[ chord.target.index ],
                        strokeStyle : "#999",
                        lineWidth   : 1,
                        globalAlpha : 0.5
                    }
                });
                return chordPath;
                
            },
            _getPointFromAng : function( angle ){
                var me = this
                var r  = me.r - me.barWidth;
                return {
                    x : r * Math.cos( angle ),
                    y : r * Math.sin( angle )
                }
            } 
        });
     
    }
)
