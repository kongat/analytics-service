import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../modules/db";

export const createNewUser = async (req, res) => {
    
    const hash = await hashPassword(req.body.username + '!');
  
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
        role: req.body.role,
        createdAt: new Date(),
      },
      select: {
        username: true,
        role: true,
        createdAt: true,
        userId: true,
        password:false
      }
    });
    const token = createJWT(user);
    res.json({ data: user, token });
    req.app.io.sockets.emit('test',{data: "received"});
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

  if(user.role == 'EMPLOYEE'){
    res.status(401);
    res.send("Unathorized");
    return;
  }
  console.log(user)
  const token = createJWT(user);
  res.json({ token });
};


export const appSignin = async (req, res) => {
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

  if(user.role !== 'EMPLOYEE'){
    res.status(401);
    res.send("Unathorized");
    return;
  }
  console.log(user)
  const token = createJWT(user);
  res.json({ token });
};


export const getUsers = async (req,res) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      role: true,
      userId: true,
      createdAt: true,
      password: false,
    }
  })

  res.json({data: users})
}

export const getUsersPageable = async (req,res) => {
  const { page = 0, pageSize = 10 } = req.query;
  

  const [users,count] = await prisma.$transaction([
  
  prisma.user.findMany({
      skip:+page * +pageSize,
      take:+pageSize,
      select: {
        username: true,
        role: true,
        userId: true,
        createdAt: true,
        password: false,
      }
  }),

  prisma.user.count()])

  res.json({data: users,totalElements: count})
}

export const changeMyPass = async (req,res) => {
  const user = await prisma.user.findUnique({
    where: { userId: req.user.id },
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
      userId: req.user.id
    },
    data: {
        password: hash,
    },
    select: {
      username: true,
      role: true,
      createdAt: true,
      userId: true,
    }
  })
  res.json({data: updatedUser})
  
}

export const changeUserPass = async (req,res) => {

  const newPasswordsMatch = req.body.newPassword == req.body.newPasswordRepeat;
  if(!newPasswordsMatch){
    res.status(400);
    res.send("New Passwords dont match");
    return;
  }

  const hash = await hashPassword(req.body.newPassword);

  const updatedUser = await prisma.user.update({
    where: {
      userId: req.body.id
    },
    data: {
        password: hash,
    },
    select: {
      username: true,
      role: true,
      createdAt: true,
      userId: true,
    }
  })
  res.json({data: updatedUser})
}

export const updateUser = async (req,res) => {
  const userId = req.body.id
  const user = await prisma.user.update({
      where: {
          userId
      },
      data: {
          username: req.body.username,
          role: req.body.role,
      },
      select: {
        username: true,
        role: true,
        createdAt: true,
        userId: true,
      }
  })

  res.json({data: user})
}

export const deleteUser = async (req,res) => {
  const deleted = await prisma.user.delete({
      where: {
        userId: req.params.id,
      }
  })

  res.json({data: deleted})
}

export const getUsersWithEmployeeRole = async (req,res) => {
  const employees = await prisma.user.findMany({
      where: {
          role: 'EMPLOYEE'
      },
      include: {
        employee: true
    }
  })

  res.json({data: employees})
}