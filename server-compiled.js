(()=>{var e={860:e=>{"use strict";e.exports=require("express")},13:e=>{"use strict";e.exports=require("mongodb")}},n={};function t(s){var r=n[s];if(void 0!==r)return r.exports;var o=n[s]={exports:{}};return e[s](o,o.exports,t),o.exports}(()=>{const{MongoClient:e}=t(13),n=t(860);let s;const r=n();r.set("view engine","ejs"),r.set("views","./views"),r.use(n.static("public")),r.get("/",(async(e,n)=>{const t=await s.collection("animals").find().toArray();console.log(t),n.render("home",{allAnimals:t})})),r.get("/admin",((e,n)=>{n.render("admin")})),async function(){const n=new e("mongodb+srv://user:AMBLUEABBADEEABBADAAE@cluster0.oxnwe.mongodb.net/AbbaDeeAbbaDae?&authSource=admin");await n.connect(),s=n.db(),r.listen(4230,(()=>{console.log("\nThe server is running at port 42300\nPress CTRL + C to end the server")}))}()})()})();