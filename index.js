
const fs = require('fs');
const path = require('path');
const app = require('express')();
const cors = require('cors');
const PORT = 8080;

app.use(cors());

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
    /*console.log("Inside the array, there are " + imageFiles.length + " images.")*/
    return imageFiles;
}

/*console.log("Outside the array, there are " + imageFiles.length + " images."); */




app.listen(
    PORT,
    () => console.log(`it is alive on http://localhost:${PORT}`)
);

app.get('/images', (req, res) => {
    const images = getImages();
    res.status(200).json({ images });
});