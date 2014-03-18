
KISSY.ready(function(){

    var S = KISSY;
    var data1= [
        ["val1","val2","val3","val4"],
        [ 1 , 101  , 201 , 301 ] ,
        [ 2  , 0 , 145 , 100 ] ,
        [ 3 , 488  , 88  , 700 ] ,
        [ 4  , 390  , 546 , 300 ] ,
        [ 5 , 0  , 88  , 700 ] ,
        [ 6  , 390  , 546 , 300 ] ,
        [ 7 , 201  , 101 , 500 ] ,
        [8  , 1145 , 145 , 100 ] ,
        [ 9 , 488  , 88  , 1700 ] ,
        [ 10  , 390  , 546 , 300 ],
        [ 11  , 390  , 546 , 300 ],
        [ 12  , 390  , 1546 , 300 ],
        [ 13  , 390  , 546 , 300 ],
        [ 14  , 390  , 546 , 300 ],
        [ 15  , 390  , 546 , 300 ],
        [ 16  , 390  , 546 , 300 ],
        [ 17  , 390  , 546 , 300 ],
        [ 18  , 390  , 546 , 300 ],
        [ 19  , 390  , 546 , 300 ],
        [ 20  , 390  , 546 , 300 ],
        [ 21  , 390  , 546 , 300 ],
        [ 22  , 390  , 546 , 300 ],
        [ 23  , 390  , 546 , 300 ],
        [ 24  , 390  , 546 , 300 ]
    ];
    var options = {
        // title : "first charts",
        // disX : 10,
        // disY : 10,
        mode  : 1,                                     //模式( 1 = 正常(y轴在背景左侧) | 2 = 叠加(y轴叠加在背景上))[默认：1]
        event : {
            enabled : 0                                //是否有事件响应(tips)
        },

        yAxis : {
            mode   : 1,                                //模式( 1 = 正常 | 2 = 显示两条(最下面 + 最上面 且与背景线不对其))
            fields : ["val4",'val3'],
            line:{
                enabled : 0,
                // strokeStyle : '#ff0000'
            },
            text:{
                // fillStyle:'#ff0000',
                fontSize  : 12
            }
        },
        back : {
            xOrigin:{
                enabled:0
            },
            yOrigin:{
                enabled:0
            },
            xAxis:{
                // lineType: ''
                thinkness:1,
                strokeStyle : '#cccccc'
            },
            yAxis:{
                // enabled : 0
            }
        },
        graphs:{
            line:{
                strokeStyle : {
                    normals : ['#f8ab5e','#E55C5C'],
                },
                alpha       : {
                    normals : [0.8, 0.7],
                }
            }
        },
        tips  :{
            // disTop : 50,
            context:{
                prefix:{
                    values:['今','昨','明']
                },
                bolds     :['bold','bold','bold'],
                fontSizes :[14,14,14],
                fillStyles:['#333333','#999999','#999999']
            },
            tip  : {
                // back:{
                    // enabled : 0
                    // disX:10
                // }
            },
            line : {
                // lineType: ''
            },
            nodes:{

            }
        }
    }

    KISSY.config({
        packages: [{
            name  :  'dvix'  ,
            path  :  '../../',
            debug :  true
        }
        ]
    });

    KISSY.use("dvix/chart/mirrorbar/ , node" , function( S , Mirrorbar ){

        window.mirrorbar = new Mirrorbar( S.all("#canvasTest") );
        mirrorbar.draw( data1 , options );

    });
});
