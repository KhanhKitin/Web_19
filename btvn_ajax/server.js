const express = require("express");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const fs = require("fs");

server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// server.get("/", (req, res) => {
//   console.log("Request to route /");
//   fs.readFile("./data.json", (error, data) => {
//     if (error) {
//       res.status(500).send("Internal server error");
//     }
//     const questions = JSON.parse(data);
//     const ramdomIndex = Math.floor(Math.random() * questions.length);
//     const ramdomQuestion = questions[ramdomIndex];
//     res.status(200).send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <meta http-equiv="X-UA-Compatible" content="ie=edge">
//             <title>Quyet De</title>
//         </head>
//         <body>
//             <h2>${ramdomQuestion.content}</h2>
//             <div>
//                 <form name = 'yes' method = 'get' action = '/vote/${ramdomQuestion.id}/yes'>
//                     <input type = 'submit' value = 'yes'/>
//                 </form>
//                 <form name = 'no' method = 'get' action = '/vote/${ramdomQuestion.id}/no'>
//                     <input type = 'submit' value = 'no'/>
//                 </form>
//             </div>
//             <div>
//                 <button id = 'question-result'>Result</button>
//                 <button id ='other-question'>Other question</button>
//             </div>
//             <script src= './public/index.js'></script>
//         </body>
//         </html>
//         `);
//   });

// });
server.get("/", (req, res) => {
      res.status(200).sendFile(path.resolve(__dirname + "/public/index1.html"));
});

server.get('/get-question-ramdom', (req,res) => {
    fs.readFile("./data.json", (error, data) => {
        if (error) {
            res.status(500).send("Internal server error");
        }
        const questions = JSON.parse(data);
        const ramdomIndex = Math.floor(Math.random() * questions.length);
        const ramdomQuestion = questions[ramdomIndex];
        if(ramdomQuestion){
            res.status(200).json(ramdomQuestion);
        }
        else{
            res.status(200).json({message: 'Question not found'});
        }
    });
});


server.get("/create-question", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/create-question.html"));
});

server.post("/create-question", (req, res) => {
  fs.readFile("./data.json", (error, data) => {
    if (error) {
      res.status(500).send("Internal server error");
    }
    const questions = JSON.parse(data);
    console.log(typeof questions);
    questions.push({
      id: questions.length,
      content: req.body.content,
      yes: 0,
      no: 0,
      createdAt: new Date().toLocaleString()
    });

    fs.writeFile("./data.json", JSON.stringify(questions), err => {
      if (error) {
        res.status(500).send("Internal server error");
      }
      res.status(201).end("Suscess");
    });
  });
  // console.log(req.body);
  // id, content, yes, no, createdAt
  // const newQuestion = {
  //     id: '',
  //     content: 'req.body',
  //     yes: 0,
  //     no : 0,
  //     createdAt: '',
  // };
});



server.get('/vote/:questionId/:vote', async (req, res) =>{
    const {questionId, vote} = req.params;
    console.log(questionId, vote);
    fs.readFile('./data.json', (error,data) =>{
        if (error) {
            res.status(500).send("Internal server error");
        }
        const questions = JSON.parse(data);
        for(let item of questions){
            if(item.id === Number(questionId)){
                vote === 'yes' ? item.yes +=1 : item.no +=1;
                break;
            }
        }
        fs.writeFile('./data.json', JSON.stringify(questions), (err) =>{
            if (err) {
                res.status(500).send("Internal server error");
            }
            res.status(200).send('update question success');
        });
    });
});
server.post('/vote',(req, res) =>{
    // const {questionId, vote} = req.query;
    // const questionId = req.query.questionId;
    // const vote = req.query.vote;
    const questionId = Number(req.query.questionId);
    const vote = req.query.vote;
    console.log(questionId, vote);
    fs.readFile('./data.json', (error,data) =>{
        if (error) {
            res.status(500).send("Internal server error");
        }
        const questions = JSON.parse(data);
        for(let item of questions){
            if(item.id === Number(questionId)){
                vote === 'yes' ? item.yes +=1 : item.no +=1;
                break;
            }
        }
        fs.writeFile('./data.json', JSON.stringify(questions), (err) =>{
            res.status(201).send({message: 'update question success'});
        });
    });
});

server.get('/result/:questionId', (req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname + "/public/vote-result.html"));
});

server.get('/get-question-by-id', (req,res) => {
    // console.log(req.query);
    const questionId = Number(req.query.questionId);
    fs.readFile('./data.json', (error, data) =>{
        if (error) {
            res.status(500).send("Internal server error");
        }
        const questions = JSON.parse(data);
        let selectQuestion;
        for(let item of questions){
            if(item.id === questionId){
                selectQuestion = item;
                break;
            }
        }
        if(selectQuestion){
            res.status(200).json(selectQuestion);
        }
        else{
            res.status(200).json({message: 'Question not found'});
        }
    });
});


server.listen(3000, error => {
    if (error) {
      throw error;
    }
    console.log("Server listen on port 3000...");
});