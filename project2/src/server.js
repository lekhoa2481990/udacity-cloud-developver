import bodyParser from 'body-parser';
import express from 'express';
import { router as imageRoutes } from './routes/imageRoutes.js';
import { router as tweetRoutes } from './routes/tweetRoutes.js';

(async () => {
  //Create an express application
  const app = express(); 
  //default port to listen
  const port = process.env.PORT || 8082; 
  
  //use middleware so post bodies are accessable as req.body
  app.use(bodyParser.json()); 
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data

  // Root URI call
  app.get( "/", ( req, res ) => {

    // filterImageFromURL("1")
    res.status(200).send("Welcome to the Project2");

  } );

  app.use(tweetRoutes)
  app.use(imageRoutes)

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();



