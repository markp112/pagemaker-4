import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, callback) => 
//     callback(null, 'uploads')
//   ,
//   filename: (req: Request, file: Express.Multer.File, callback) => {

//   }
// })

const multerMemory = multer({storage: multer.memoryStorage()});

export { multerMemory };
