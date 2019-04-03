const express = require('express');
const PostModel = require('./models');

const postRouter = express();

postRouter.post('/', async (req, res) => {
    // create user
    try{
        if(!req.session.user){
            res.status(403).json({
                message: 'Unauthenticated',
            });
        }
        if(req.session.user && req.session.user.permissions.indexOf('POST.CREATE') > -1){
            const postInfo = req.body;
            const newPost = await PostModel.create(postInfo);
            res.status(201).json(newPost);
        }else{
            res.status(403).json({
                message: 'Unauthenticated',
            })
        }
        
    }catch(error){
        res.status(500).end(error.message);
    };
}); 

postRouter.get('/:postId', async (req, res) => {
    try{
       const {postId} = req.params;
       const postInfo = await PostModel.findById(postId)
    //    .populate('author', 'email fistName createdAt')
       .populate({
        path: 'author',   
        select: 'email fistName lastName createdAt',
    })
       .exec();
       res.status(200).json(postInfo);
    }catch(error){
        res.status(500).end(error.message); 
    };
});

postRouter.get('/', async (req, res) => {
    try{
        const { pageNumber, pageSize } = req.query;
        // const totalRecord = await PostModel.find().countDocuments();
        const data = await PostModel.find()
        .skip(pageSize * (pageNumber-1))
        .limit(Number(pageSize))
        .exec();
        res.status(200).json(data);
    }catch(error){
        res.status(500).end(error.message); 
    }
});

module.exports = postRouter;