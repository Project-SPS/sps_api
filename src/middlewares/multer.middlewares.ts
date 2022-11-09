import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({
    destination: "upload",
    filename: (req, file, call) => {
      const fileName = `${file.originalname}`;
      return call(null, fileName);
    },
  }),
});
