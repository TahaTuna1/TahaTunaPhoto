/* This file reads the directories and writes them to the local file 'images.json' to be fetched later. 
It uses node.js. Express.js dependency removed. 
IMPORTANT : Need to run this script every time the photos are changed/updated.
 */


const fs = require('fs');
const path = require('path');

const imageFolders = [
    { folder: './images', name: 'imagesMain' },
    { folder: './images/street', name: 'street' },
    { folder: './images/product', name: 'product' },
    { folder: './images/portrait', name: 'portrait' },
    { folder: './images/stage', name: 'stage' }
  ];
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

const getImages = () => {

    const imageFiles = {};

  imageFolders.forEach((folder) => {
    const folderFiles = [];
    fs.readdirSync(folder.folder).forEach((file) => {
      const extension = path.extname(file);
      if (validExtensions.includes(extension)) {
        folderFiles.push(path.join(folder.folder, file));
      }
    });
    imageFiles[folder.name] = folderFiles;
  });
  fs.writeFileSync('./images.json', JSON.stringify(imageFiles));
  console.log("Files written to ./images.json");
    /*console.log("Inside the array, there are " + imageFiles.length + " images.")*/
    return imageFiles;
}

getImages();
/*console.log("Outside the array, there are " + imageFiles.length + " images."); */




/* Express JS Solution adn Dependency removed as of 07/04/2023. Writing image names to local json file instead. Node.js only.*/

/*const app = require('express')();*/
/*const cors = require('cors');*/
/*const PORT = 8080;*/

/*app.use(cors());*/
/*
app.listen(
    PORT,
    () => console.log(`it is alive on http://localhost:${PORT}`)
);

app.get('/images', (req, res) => {
    const images = getImages();
  
    res.status(200).json({ images });
});
*/