// 获取图片原始尺寸
export class naturalDimensions {

    static getImgNaturalDimensions(imgDom) {
        var nWidth, nHeight;
        if (imgDom.naturalWidth) { // 现代浏览器
            nWidth = imgDom.naturalWidth;
            nHeight = imgDom.naturalHeight;
        } else { // IE6/7/8
            nWidth = imgDom.width;
            nHeight = imgDom.height;
        }
        return { w: nWidth, h: nHeight }
    }
    static handle(imgDom) {
        return new Promise((resolve, reject) => {
            //图片已加载
            if (this.isLoaded(imgDom)) {
                resolve(this.getImgNaturalDimensions(imgDom))
            } else {
                //加载超时
                let timer = setTimeout(() => {
                    imgDom.onload = null
                    reject('img load failed')
                }, 5000)
                imgDom.addEventListener('load',  ()=> {
                    clearTimeout(timer)
                    //加载成功
                    resolve(this.getImgNaturalDimensions(imgDom));
                })
                imgDom.addEventListener('error',  ()=> {
                    clearTimeout(timer)
                    console.error('load image  error:'+imgDom.src)
                    //加载失败
                    resolve({ w: 300, h: 400 });
                })
            }
        })
    }
    static isLoaded(imgDom) {
        return imgDom.complete || imgDom.readyState == 'complete' || imgDom.readyState == 'loaded';
    }
}

export function cloneCanvas(oldCanvas) {
    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);
    //return the new canvas
    return newCanvas;
}
// 笔刷配置
export const brushOption = {
    1: {
        minWidth: 0.2,
        maxWidth: 1.3,
    },
    2: {
        minWidth: 0.3,
        maxWidth: 2
    },
    3: {
        minWidth: 0.4,
        maxWidth: 2.5
    },
    4: {
        minWidth: 0.5,
        maxWidth: 3
    },
    5: {
        minWidth: 0.6,
        maxWidth: 3.5
    },
    6: {
        minWidth: 0.7,
        maxWidth: 4
    },
    7: {
        minWidth: 0.8,
        maxWidth: 5
    },
    8: {
        minWidth: 0.9,
        maxWidth: 8
    },
    9: {
        minWidth: 1,
        maxWidth: 10
    },
}
