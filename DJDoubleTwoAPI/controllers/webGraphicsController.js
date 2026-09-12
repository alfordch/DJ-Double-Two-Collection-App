const fs = require('fs');
const path = require('path');

const graphicsDirectory = path.resolve(
   __dirname,
   '../../DJDoubleTwoClient/public/webGraphics'
);

exports.getWebGraphics = (req, res) => {
   const itemID = req.params.itemID;

   // Make sure itemID is numeric
   if (!/^\d+$/.test(itemID)) {
      return res.status(400).json({ error: 'Invalid item ID' });
   }

   const itemGraphicsDirectory = path.join(
      graphicsDirectory,
      itemID,
      'graphics'
   );

   fs.readdir(itemGraphicsDirectory, { withFileTypes: true }, (err, files) => {
      if (err) {
         if (err.code === 'ENOENT') {
            return res.json([]);
         }

         console.error('Error reading graphics directory:', err);
         return res.status(500).json({
            error: 'Failed to retrieve item graphics'
         });
      }

      const images = files
         .filter(file =>
            file.isFile() &&
            /\.(webp|jpg|jpeg|png|gif)$/i.test(file.name)
         )
         .map(file => ({
            name: file.name,
            url: `/webGraphics/${itemID}/graphics/${encodeURIComponent(file.name)}`
         }))
         .sort((a, b) => a.name.localeCompare(b.name, undefined, {
            numeric: true
         }));

      res.json(images);
   });
};