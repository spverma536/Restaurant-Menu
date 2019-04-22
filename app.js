var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/desserts");

app.use(bodyParser.urlencoded(
    {extended: true}
));

app.set("view engine","ejs");

//Schema
var itemSchema = new mongoose.Schema({
    name: String,
    image: String
});

var deserts = mongoose.model("desserts",itemSchema);

/* deserts.create(
    {
        name: "Kumquat Compote",
        image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/17/0/LR0903H_seared-arctic-char-with-kumquat-compote_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371603036698.jpeg"
    }, function(err, Dessert){
        if(err){
            console.log(err);
        } else {
            console.log("Item added");
            console.log(Dessert);
        }
    }
);  */

var starters = [
    {name: "Seafood Tower", img:"https://media-cdn.tripadvisor.com/media/photo-s/0f/a0/be/6c/seafood-tower.jpg"},
    {name: "Roasted Oysters", img:"https://www.seriouseats.com/recipes/images/2016/07/20160801-grilled-oysters-25.jpg"},
    {name: "Burrata", img: "http://www.insulinresistancerecipes.com/wp-content/uploads/2015/12/DSC08566.jpg"},
    {name: "Grilled Calamari Flatbread", img:"https://millersalehouse.com/wp-content/uploads/2016/08/featured_flatbread.jpg"},
    {name: "Pickled Fresno", img: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fpickled-fresno-chiles-su.jpg%3Fitok%3DcwJwzE22&w=450&c=sc&poi=face&q=85"},
    {name: "Roasted Market Squash", img: "https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2017276/910/607/m1/fpnw/wm1/kw7gwyxlryteg7sfzy2jqxhhh6nexmodxbbgg0pprzk8xrw4yltyfttmd4eecanc-.jpg?1481562509&s=c0da65803909aee4afc8e101cc1a5527"}
]

app.get("/starters",function(req,res) {
    
    res.render("starters",{starters:starters});
});

app.post("/starters", function(req, res){
    //res.send("It was the post route.")
    var name = req.body.name;
    var image = req.body.image;
    var newstarter = {name: name, image: image}
    starters.push(newstarter);
    res.redirect("/starters");
});

var mains = [
    {name: "Brick-Pressed Half Chicken", img: "https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18235802/fc59ra036-02-thumb16x9.jpg"},
    {name: "Mushroom Lasagna", img: "https://www.cscassets.com/recipes/wide_cknew/wide_60207.jpg"},
    {name: "Sweet Potato Vinaigrette", img: "https://asdoasdiadnsiuhiwuh.files.wordpress.com/2010/10/sweet_pot_salad_1-scaled1000.jpg"},
    {name: "Chiang Mai Sausage", img: "https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/thanin_market_chiang_mai_sausage2.jpg?itok=Qj15vgp6"},
    {name: "Fisherman’s Stew", img: "https://static01.nyt.com/images/2014/03/31/dining/fish-stew-mediterranean/fish-stew-mediterranean-superJumbo.jpg"}
]

app.get("/mains",function(req,res) {
    
    res.render("mains",{mains:mains});
});

app.post("/mains", function(req, res){
    //res.send("It was the post route.")
    var name = req.body.name;
    var image = req.body.image;
    var newmains = {name: name, image: image}
    mains.push(newmains);
    res.redirect("/mains");
});

app.get("/",function(req,res) {
    //res.send("Winter will be here soon ;(");
    res.render("landing");
});



app.get("/desserts",function(req,res) {
    deserts.find({}, function(err, alldesserts){
        if(err){
            console.log(err);
        } else {
            res.render("desserts",{desserts : alldesserts});
        }
    });
});

/* Dessert.create(
    {
        name: "Kumquat Compote",
        image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/17/0/LR0903H_seared-arctic-char-with-kumquat-compote_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371603036698.jpeg"
    }, function(err, dessert){
        if(err){
            console.log(err);
        } else {
            console.log("Dessert added");
            console.log(dessert);
        }
    }
); */

/* app.post("/desserts", function(req, res){
    //res.send("It was the post route.")
    var name = req.body.name;
    var image = req.body.image;
    var newdessert = {name: name, image: image}
    desserts.push(newdessert);
    res.redirect("/desserts");
});  */

app.post("/desserts", function(req, res){
    //res.send("It was the post route.")
    var name = req.body.name;
    var image = req.body.image;
    var newdessert = {name: name, image: image}
    deserts.create(newdessert, function(err, newlyCreadted){
        if(err){
            console.log(err);
        } else {
            res.redirect("/desserts");
        }
    })
});

app.get("/desserts/new",function(req,res){
    res.render("new.ejs");
});

app.listen(3000, "localhost" , function() {
    console.log("Server started");
});

const http = require('http');
const port=process.env.PORT || 3000
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
res.end('<h1>Hello World</h1>');
});
server.listen(port,() => {
console.log(`Server running at port `+port);
});
