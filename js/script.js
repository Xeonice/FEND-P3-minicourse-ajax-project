
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

    var streetStr = $('#street').val(); //获取street栏输入信息
    var cityStr = $('#city').val(); //获取city栏输入信息
    var address = streetStr + "," + cityStr; //组合street信息，city信息，合成position信息

    var API_KEY = '&key=AIzaSyBDBBteQ2_faToWAPcPLZyWG_zJBwFSwyw'; //API密钥

    $greeting.text("So, you want to live at " + address + '?'); //gretting信息

    var streetUrl = "'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + API_KEY; //街景照片Url = 初始信息 + address + API密钥
    $body.append('<img class="bgimg" src=' + streetUrl + "'>"); //在body最后加入图片html代码

    return false;
};

$('#form-container').submit(loadData);
