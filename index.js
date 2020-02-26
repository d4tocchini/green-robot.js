var robotjs = require('./build/Release/robotjs.node');

module.exports = robotjs;

module.exports.screen = {};

function bitmap(width, height, byteWidth, bitsPerPixel, bytesPerPixel, image) 
{
    this.width = width;
    this.height = height;
    this.byteWidth = byteWidth;
    this.bitsPerPixel = bitsPerPixel;
    this.bytesPerPixel = bytesPerPixel;
    this.image = image;

    this.colorAt = function(x, y)
    {
        return robotjs.getColor(this, x, y);
    };

}

module.exports.screen.capture = function(x, y, width, height)
{
    //If coords have been passed, use them.
    if (typeof x !== "undefined" && typeof y !== "undefined" && typeof width !== "undefined" && typeof height !== "undefined")
    {
        b = robotjs.captureScreen(x, y, width, height);
    }
    else 
    {
        b = robotjs.captureScreen();
    }

    return new bitmap(b.width, b.height, b.byteWidth, b.bitsPerPixel, b.bytesPerPixel, b.image);
};


/**
 * Returns the coordinates of a desktop using the passed desktop sharing source
 * id.
 *
 * @param {string} sourceId - The desktop sharing source id.
 * @returns {Object.<string, number>|undefined} - The x and y coordinates of the
 * top left corner of the desktop. Currently works only for windows. Returns
 * undefined for Mac OS, Linux.
 */
module.exports.sourceId2Coordinates = function(sourceId) {
    if(typeof sourceId !== "string" || sourceId === '') {
        return undefined;
    }
    // On windows the source id will have the following format "desktop_id:0".
    // we need the "desktop_id" only to get the coordinates.
    const idArr = sourceId.split(":");
    const id = Number(idArr.length > 1 ? idArr[0] : sourceId);
    if(!isNaN(id)) {
        return robotjs.source_id2coord(id);
    }
    return undefined;
};
