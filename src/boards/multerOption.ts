import { diskStorage } from "multer";
import { v4 } from 'uuid';

export const multerOptions = {
  limits: {
    fileSize: +process.env.maxfilesize,
  },

  fileFilter: (request, file:Express.Multer.File, callback) => {

    console.log(file.mimetype);
    //if (file.mimetype.match(/\/(x-hwp|vnd.hancom.*|jpg|jpeg|png|octet-stream|plain|mp4|html|css|javascript|gif|bmp|webp|midi|mpeg|webm|agg|wav|pkcs12|vnd.mspowerpoint|xhtml+xml|xml|pdf|x-zip-compressed|x-msdownload|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    //} else {
    //    callback(new BadRequestException('지원하지 않는 파일 형식입니다.'), false);
    //}
  },

  storage: diskStorage({
    destination: '../logos',
    filename: (req, file, cb)=>
    {
        const dotIndex = file.originalname.indexOf('.');
        const name = v4(file);
        cb(null, name+file.originalname.substring(dotIndex, file.originalname.length));
    }
  })
}
