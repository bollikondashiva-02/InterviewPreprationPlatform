const Bookmark = require("../models/Bookmark");


// Add Bookmark
const addBookmark = async (req, res) => {

  try {

    const { question } = req.body;


    // check already bookmarked
    const existingBookmark = await Bookmark.findOne({
      user: req.user.id,
      question
    });


    if(existingBookmark){

      return res.status(400).json({
        message:"Question already bookmarked"
      });

    }


    const bookmark = await Bookmark.create({

      user:req.user.id,
      question

    });


    res.status(201).json({

      message:"Bookmark added ✅",
      bookmark

    });


  } 
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};




// Get My Bookmarks
const getBookmarks = async(req,res)=>{

  try{

    const bookmarks = await Bookmark.find({

      user:req.user.id

    })
    .populate("question")
    .populate("user","name email");


    res.json(bookmarks);


  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};




// Delete Bookmark
const deleteBookmark = async(req,res)=>{

  try{


    const bookmark = await Bookmark.findOneAndDelete({

      _id:req.params.id,
      user:req.user.id

    });


    if(!bookmark){

      return res.status(404).json({
        message:"Bookmark not found"
      });

    }


    res.json({

      message:"Bookmark removed ✅"

    });


  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};



module.exports = {

addBookmark,
getBookmarks,
deleteBookmark

};