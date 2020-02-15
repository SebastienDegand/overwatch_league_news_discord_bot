const Jimp = require('jimp');

function generateImage(imageCompetitor1, imageCompetitor2, nameCompetitor1, nameCompetitor2, topMessage) {
  let imagePromises = [];
  let image = new Jimp(300, 175, 'white');
  
  imagePromises.push(Jimp.read(imageCompetitor1).
      then(image => {
          return image.resize(100, 100)
      })
  )
  imagePromises.push(Jimp.read(imageCompetitor2).
      then(image => {
          return image.resize(100, 100)
      })
  )
  
  return Promise.all(imagePromises).then((images) => {
      image.composite(images[0], 0, 25);
      image.composite(images[1], 200, 25)
      return Jimp.loadFont('resources/big_noodle_titling_oblic_50.fnt')     
  }).then(font => {
      let textVsImage = new Jimp(100, 100, 0x0);
      textVsImage.print(font, 0, 0, { text: 'VS', alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 100, 100);
      textVsImage.color([{ apply: 'xor', params: ['#FFFFFF'] }]);
      image.composite(textVsImage, 100, 25)
      return Jimp.loadFont('resources/big_noodle_titling_oblic_20.fnt')
  }).then(font => {
      let textCompetitor1Image = new Jimp(100, 50, 0x0);
      textCompetitor1Image.print(font, 0, 0, { text: nameCompetitor1, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 100, 50);
      textCompetitor1Image.color([{ apply: 'xor', params: ['#FFFFFF'] }]);
      image.composite(textCompetitor1Image, 0, 125)

      let textCompetitor2Image = new Jimp(100, 50, 0x0);
      textCompetitor2Image.print(font, 0, 0, { text: nameCompetitor2, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 100, 50);
      textCompetitor2Image.color([{ apply: 'xor', params: ['#FFFFFF'] }]);
      image.composite(textCompetitor2Image, 200, 125)

      let textTopMessageImage = new Jimp(300, 25, 0x0);
      textTopMessageImage.print(font, 0, 0, { text: topMessage, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 300, 25);
      textTopMessageImage.color([{ apply: 'xor', params: ['#FFFFFF'] }]);
      image.composite(textTopMessageImage, 0, 0)
      
      let buffer;
      image.getBuffer(Jimp.MIME_PNG, (error, result) => {
          buffer = result;
      })
      return buffer;
  })
}

module.exports = {
    generateImage
}

