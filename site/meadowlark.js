/**
 * Created by 15928 on 2017/10/2.
 */
var express=require('express');
var fortune=require('./lib/fortune.js');
var app = express();
//设置handlebars视图引擎
var handlebars=require('express3-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT||3000);

//填加static中间件
app.use(express.static(__dirname+'/public'));

//定义一个虚拟饼干数组
// var fortunes=[
//     "Conquer your fears or they will conquer you.",
//     "rivers need springs.",
//     "Do not fear what you don't know.",
//     "You will have a pleasant surprise.",
//     "Whenever possible,keep it simple"
// ];
//填加新路由
app.get('/',function(req,res){
    // res.type('text.plain');
    // res.send('Meadowlark Travel');

    res.render('home');
});
app.get('/about',function(req,res){
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');

    // var randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{fortune:fortune.getFortune()});
});

//定制404页面
app.use(function(req,res,next){
    // res.type('text/plain');
    // res.status(404);
    // res.send('404-Not Found');

    res.status(404);
    res.render('404');
});
//定制500页面
app.use(function(err,req,res,next){
    console.error(err.stack);
    // res.type('text/plain');
    // res.status(500);
    // res.send('500-Server Error');

    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express start on http://localhost:'+app.get('port')+';press Ctrl-C to terminate');
});