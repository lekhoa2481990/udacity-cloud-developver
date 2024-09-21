import express from "express";
import uploadImage from "../middleware/uploadImageToS3Middleware.js";
import {filterImageFromURL, deleteLocalFiles} from '../util/util.js';

export const router = express.Router();

router.post("/images/", uploadImage.single('file'), async (req, res) => {
    if(req.file){
        res.status(201).json({url: req.file.location});
    } else {
        console.error('S3 upload failed', req)
        res.status(500).send('Image upload failed')
    }
});

router.get( "/images/filteredimage", async ( req, res ) => {
    let { image_url } = req.query;

    if ( !image_url ) {
      return res.status(400).send(`url is required`);
    }

    const filteredpath = await filterImageFromURL(image_url)
    // const tweetById = await tweetService.findTweetById(id)

    if(!filteredpath){
      return res.status(404).send(`url not found`)
    }

    // return res.status(200).send(`url is sucessfull`);
    return res.status(200).sendFile(filteredpath)
} );