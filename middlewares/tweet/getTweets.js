export const getTweetsMW=(objRepo)=>{
    const {tweetModel}=objRepo;
    
    return(req, res, next)=>{
    
        const tweets=tweetModel.find({
        visibility:'public',
        })
        res.locals.tweets=tweets;
    return next()
    }
    }