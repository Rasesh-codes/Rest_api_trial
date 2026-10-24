const express = require('express');
let app = express();

const port = 8080;

app.use(express.urlencoded({extended : true}));

const path = require('path');
const methodOverride = require('method-override');

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

const { v4 : uuidv4 } =require("uuid");

app.use(methodOverride('_method'));

// ⇨ 'b18794e8-5d0d-417c-b361-ba38e78411b4'

app.listen(port , ()=>{
    console.log(`listening to port : ${port}`);
})

let posts = [
    {
        username : "apna college",
        content : "i love coding",
        id : uuidv4()
    },
    {
        username : "rasesh",
        content : "i love coding",
        id : uuidv4()
    },
    {
        username : "dhruv",
        content : "i love coding",
        id : uuidv4()
    }
]

app.get("/posts" , (req,res) => {
    res.render("index.ejs" , { posts });
})

app.use(express.json());

app.get("/posts/new" , (req,res) => {
    res.render("new.ejs");
})

app.get("/posts/:id/edit" ,(req,res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , { post });
})


app.get("/posts/:id", (req,res) => { 
    let { id } = req.params ; 
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs" , { post });
})


app.post("/posts" , (req,res) =>{
    let {username , content} = req.body;
    let id = uuidv4(); 
    posts.push({username , content , id});
    res.redirect("/posts");
    
})

app.post("/posts/:id" , (req,res) =>{
    let { id } = req.params;
    let index = posts.findIndex((p) => p.id == id);
    posts.splice(index,1);
    res.redirect("/posts");
})

app.patch("/posts/:id" , (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let { content } = req.body;
    post.content = content;
    res.redirect("/posts");
})


