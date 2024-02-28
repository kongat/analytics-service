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


  export const getUsers = async (req,res) => {
    const users = await prisma.user.findMany()

    res.json({data: users})
  }

  export const getUsersPageable = async (req,res) => {
    const { page = 0, pageSize = 10 } = req.query;
    

    const [users,count] = await prisma.$transaction([
    
    prisma.user.findMany({
        skip:+page * +pageSize,
        take:+pageSize
    }),

    prisma.employee.count()])

    res.json({data: users,totalElements: count})
}

  export const changePass = async (req,res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    const isValid = await comparePasswords(req.body.oldPassword, user.password);

    if (!isValid) {
      res.status(400);
      res.send("Invalid old password");
      return;
    }

    const newPasswordsMatch = req.body.newPassword == req.body.newPasswordRepeat;
    if(!newPasswordsMatch){
      res.status(400);
      res.send("New Passwords dont match");
      return;
    }

    const hash = await hashPassword(req.body.newPassword);

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
          password: hash,
      }
  })
  res.json({data: updatedUser})
    
}