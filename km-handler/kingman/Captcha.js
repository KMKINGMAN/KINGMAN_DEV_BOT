const Canvas = require("canvas");
const crypto = require("crypto");
Canvas.registerFont("./Tajawal-Regular.ttf", {
    family: "KINGMAN"
});
const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    .replace(/[RGQIOVMI01]+/g, "");
function randomize(seed, len) {
    const sourceArray = seed.split('');
    let baselen = typeof len === 'undefined' ? sourceArray.length : len;
    const rnd = crypto.randomBytes(baselen);
    const result = [];
    let counter = 0, characterIndex, r;
    while (baselen > 0) {
        r = rnd[counter];
        characterIndex = r % sourceArray.length;
        result.push(sourceArray.splice(characterIndex, 1)[0]);
        baselen--;
        counter++;
    }
    return result.join('');
}
const randomText = () => {
    const alphaseed = randomize(alphanumeric);
    return randomize(alphaseed, 6);
};
const shuffleArray = (arr) => {
    let i = arr.length, temp, randomIndex;
    while (0 !== i) {
        randomIndex = Math.floor(Math.random() * i);
        i -= 1;
        temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
};
class Captcha {
    constructor(_h = 120, _text, _complexity) {
        var _a, _b, _c;
        _h = typeof _h !== "number" || _h < 120 ? 120 : _h > 400 ? 400 : _h;
        this._canvas = Canvas.createCanvas(400, _h);
        {
            const c = 100; 
            const r = 255 - c - Math.round(Math.random() * (255 - c));
            const g = 255 - c - Math.round(Math.random() * (255 - c));
            const b = 255 - c - Math.round(Math.random() * (255 - c));
            this._color = `rgb(${r}, ${g}, ${b})`;
        }
        const ctx = this._canvas.getContext("2d");
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.fillRect(0, 0, 400, _h);
        ctx.save();
        let scaling = _h / 150;
        if (scaling > 1.3)
            scaling = 1.3;
        ctx.strokeStyle = this._color;
        ctx.lineWidth = 4 * scaling;
        ctx.beginPath();
        const coords = [];
        for (let i = 0; i < 4; i++) {
            if (!coords[i])
                coords[i] = [];
            for (let j = 0; j < ((_a = _complexity === null || _complexity === void 0 ? void 0 : _complexity.lines) !== null && _a !== void 0 ? _a : 5); j++)
                coords[i][j] = Math.round(Math.random() * 80) + j * 80;
            if (!(i % 2))
                coords[i] = shuffleArray(coords[i]);
        }
        for (let i = 0; i < coords.length; i++) {
            if (!(i % 2)) {
                for (let j = 0; j < coords[i].length; j++) {
                    if (!i) {
                        ctx.moveTo(coords[i][j], 0);
                        ctx.lineTo(coords[i + 1][j], 400);
                    }
                    else {
                        ctx.moveTo(0, coords[i][j]);
                        ctx.lineTo(400, coords[i + 1][j]);
                    }
                }
            }
        }
        ctx.stroke();
        ctx.fillStyle = this._color;
        ctx.lineWidth = 0;
        for (let i = 0; i < 200; i++) {
            ctx.beginPath();
            ctx.arc(Math.round(Math.random() * 360) + 20, 
            Math.round(Math.random() * 360) + 20, 
            Math.round(Math.random() * ((_b = _complexity === null || _complexity === void 0 ? void 0 : _complexity.circleRadius) !== null && _b !== void 0 ? _b : 7) * scaling) + 1, 
            0, 
            Math.PI * 2 
            );
            ctx.fill();
        }
        ctx.fillStyle = this._color;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.translate(0, _h);
        ctx.translate(Math.round(Math.random() * 40 - 20) + 30, -1 * Math.round(Math.random() * (_h / 8) - _h / 16) - _h / 2 + _h / 8);
        ctx.rotate(0.3 * (Math.random() - 0.5));
        ctx.beginPath();
        if (_text) {
            this._value = _text;
        }
        else {
            this._value = "";
            while (this._value.length !== 6)
                this._value = randomText();
        }
        let xCoord = 0;
        for (const chr of this._value) {
            const size = ((Math.random() - 0.5) * 40 + 70) * scaling;
            const font = chr.match(/[a-z]/i) ? 'swift' : 'serif';
            ctx.font = `bold ${size}px ${font}`;
            ctx.fillText(chr, xCoord, 0);
            xCoord += ctx.measureText(chr).width;
        }
        ctx.restore();
        for (let i = 0; i < ((_c = _complexity === null || _complexity === void 0 ? void 0 : _complexity.foregroundNoise) !== null && _c !== void 0 ? _c : 5000); i++) {
            ctx.beginPath();
            let color = "#";
            while (color.length < 7)
                color += Math.round(Math.random() * 16).toString(16);
            color += "a0";
            ctx.fillStyle = color;
            ctx.arc(Math.round(Math.random() * 400), 
            Math.round(Math.random() * _h),
            Math.random() * 2, 
            0, 
            Math.PI * 2 
            );
            ctx.fill();
        }
    }
    get value() {
        return this._value;
    }
    get PNGStream() {
        return this._canvas.createPNGStream();
    }
    get JPEGStream() {
        return this._canvas.createJPEGStream();
    }
    get dataURL() {
        return this._canvas.toDataURL("image/jpeg");
    }
}
exports.default = Captcha;