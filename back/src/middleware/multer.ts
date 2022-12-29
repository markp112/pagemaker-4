import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, callback) => 
//     callback(null, 'uploads')
//   ,
//   filename: (req: Request, file: Express.Multer.File, callback) => {

//   }
// })

const multerUploads = multer(
  { storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    }
  });

export { multerUploads };
