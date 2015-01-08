KISSY.ready(function(){

    var S = KISSY;
    // var data1= [
    //     ["val1","val2","val3","val4"],
    //     [ 1 , 101  , 20 , 33 ] ,
    //     [ 2 , 67  , 51 , 26 ] ,
    //     [ 3 , 76  , 45 , 43 ] ,
    //     [ 4 , 58  , 35 , 31 ] ,
    //     [ 5 , 79  , 73 , 71 ] ,
    //     [ 6 , 88  , 54 , 39 ] ,
    //     [ 7 , 56  , 68 , 65 ] ,
    //     [ 8 , 99  , 83 , 51 ] 
    // ];
//179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,76.43,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8,179.8
    var data1 = [                                          //拐角有节点
        ['val1','val2'],
        [1, 179],
        [2, 179],
        [3, 179],
        [4, 179],
        [5, 179],
        [6, 179],
        [7, 179],
        [8, 179],
        [9, 179],
        [10, 179],
        [11, 76],
        [12, 43],
        [13, 100],
        [14, 100],
        [15, 100],
        [16, 100],
        [17, 100],
        [18, 179],
        [19, 179],
        [20, 179],
    ]

    var data1 = [
            [ "date"       , "uv1" , "uv1" , "uv2" ],
            [ "2014-12-24" , 100        ,  200         , 300 ],
            [ "2014-12-25" , 200        ,  250         , 100 ],
            [ "2014-12-26" , 160        ,  260         , 180 ],
        ]

    var options = {

        yAxis : {
            field : ["uv1","uv2","uv3"]
        },
        xAxis : {
            field : "date"
        },
        graphs:{
            line:{
                strokeStyle : {
                    normals : ["#6f8cb2" , "#c77029" , "#f15f60" ]
                },
                alpha       : {                            //有填充时,透明度 注意：有几条线,有几个值
                    // normals : [0.1,0.1,0.1],
                    // overs                               //*
                }
            }
        }
    }
    // KISSY.config({
    //     packages: [{
    //         name  :  'chartx'  ,
    //         path  :  '../../',
    //         debug :  true
    //     }
    //     ]
    // });

    KISSY.use("chartx/chart/line/ , node" , function( S , Line ){
        var line = new Line( S.all("#canvasTest") , data1 , options  );
        line.draw();
    });
});
