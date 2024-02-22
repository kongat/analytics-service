import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../modules/db";

export const createNewUser = async (req, res) => {
    const hash = await hashPassword(req.body.password);
  
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  };

  export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if(!user){
      res.status(401);
      res.send("Invalid username");
      return;
    }
    
    const isValid = await comparePasswords(req.body.password, user.password);
  
    if (!isValid) {
      res.status(401);
      res.send("Invalid password");
      return;
    }
    console.log(user)
    const token = createJWT(user);
    res.json({ token });
  };