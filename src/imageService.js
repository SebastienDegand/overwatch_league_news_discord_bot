const Jimp = require('jimp');

function generateImage(match, message) {
    let imagePromises = [];
    let image = new Jimp(300, 175, 'white');
    
    imagePromises.push(Jimp.read(match.competitors[0].logoUrl).
        then(image => {
            return image.resize(75, 75)
        })
    )
    imagePromises.push(Jimp.read(match.competitors[1].logoUrl).
        then(image => {
            return image.resize(75, 75)
        })
    )
    
    return Promise.all(imagePromises).then((images) => {
        let imageLeftCompetitor = new Jimp(150, 150, match.competitors[0].backgroundColor);
        imageLeftCompetitor.composite(images[0], 37.5, 12.5)
        image.composite(imageLeftCompetitor, 0, 25)
        let imageRightCompetitor = new Jimp(150, 150, match.competitors[1].backgroundColor);
        imageRightCompetitor.composite(images[1], 37.5, 12.5)
        image.composite(imageRightCompetitor, 150, 25)

        return Jimp.loadFont(Jimp.FONT_SANS_12_BLACK)
    }).then(font => {
        let imageVs = new Jimp(37, 19, 'white');
        imageVs.print(font, 0, 0, { text: 'VS', alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 37, 19);
        image.composite(imageVs, 131, 90)

        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    }).then(font => {

        let imageFooterTextLeft = new Jimp(150, 50);
        imageFooterTextLeft.print(font, 0, 0, { text: match.competitors[0].name, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 150, 50);
        imageFooterTextLeft.color([{ apply: 'xor', params: [match.competitors[0].textColor] }]);
        image.composite(imageFooterTextLeft, 0, 125);
        let imageFooterTextRight = new Jimp(150, 50);
        imageFooterTextRight.print(font, 0, 0, { text: match.competitors[1].name, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 150, 50);
        imageFooterTextRight.color([{ apply: 'xor', params: [match.competitors[1].textColor] }]);
        image.composite(imageFooterTextRight, 150, 125);

        let imageTopText = new Jimp(300, 25);
        imageTopText.print(font, 0, 0, { text: message, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 300, 25);
        image.composite(imageTopText, 0, 0);

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

