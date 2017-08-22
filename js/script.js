
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    //Google街景
    var streetStr = $('#street').val(); //获取street栏输入信息
    var cityStr = $('#city').val(); //获取city栏输入信息
    var address = streetStr + "," + cityStr; //组合street信息，city信息，合成position信息

    var API_KEY = '&key=AIzaSyBDBBteQ2_faToWAPcPLZyWG_zJBwFSwyw'; //API密钥

    $greeting.text("So, you want to live at " + address + '?'); //gretting信息

    var streetUrl = "'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + API_KEY; //街景照片Url = 初始信息 + address + API密钥
    $body.append('<img class="bgimg" src=' + streetUrl + "'>"); //在body最后加入图片html代码

    //NYTime新闻
    var nytimeUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json" + '?' + $.param({
        'api-key': "62c7b3d7669d44cc8546d9967fcace22"
    });                                                                                     //初始化nytime API所需URL

    jQuery.getJSON(nytimeUrl, function (data) {                                             //设定AJAX事件
        $nytHeaderElem.text('New york time Article About ' + cityStr);                      //设定标题栏为文本+城市信息
        articles = data.response.docs;                                                      //article为API自带对象，自带10条新闻，data.response.docs从NYTime获取文本
        for(var i = 0; i < articles.length; i++){                                           //循环输出对象
            var article = articles[i];
            $nytElem.append(                                                                //添加HTML代码，输出新闻URL，标题，概要
                '<li class="article">' +
                    '<a href=" ' + article.web_url + '">' + article.headline.main + '</a>' +
                    '<p>' + article.snippet + '</p>' +
                '</li>');
        }

    }).error(function(e) {                                                                  //报错信息
        $nytHeaderElem.text("New York time could not be loaded");
    });

    //wiki API调用
    //wiki API只接受JSONP类型数据
    //JSONP未内置错误处理流程
    //因此用setTimeout处理
    var wikiRequestTimeOut = setTimeout(function (e) {
        $wikiElem.text("failed to load wiki.")
    }, 8000);                                                                              //setTimeout = 处理函数 + 等待时间
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    $.ajax({                                                                               //ajax函数，由url与Setting组成
        url: wikiUrl,                                                                      //设定url，可提至大括号外
        dataType: "jsonp",                                                                 //设定传输类型为JSONP

        success: function(response){
            var articleList = response[1];                                                 //articleList为从response项中取出

            for(var i = 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' +
                    articleStr + '</a></li>');
            };
            clearTimeout(wikiRequestTimeOut);                                              //成功加载时，消去timeout信息，否则8s后timeout会自动显示
        }
    });
    return false;
};

$('#form-container').submit(loadData);
