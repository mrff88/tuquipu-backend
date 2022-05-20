import User from './model.js';

const id = async (req, res, next, userId) => {
  try {
    const foundUser = await User.findById(userId).exec();
    if (foundUser) {
      req.user = foundUser;
      next();
    } else {
      const message = `No se encontro al usuario`;

      next({
        message,
        statusCode: 404,
        type: 'warn',
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

const create = async (req, res, next) => {
  const { body = {} } = req;
  const newUser = new User(body);

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// eslint-disable-next-line no-unused-vars
const read = (req, res, next) => {
  const { user = {} } = req;

  res.json({
    success: true,
    data: user,
  });
};

const update = async (req, res, next) => {
  const { user = {}, body = {} } = req;

  Object.assign(user, body);

  try {
    const updatedUser = await user.save();
    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const all = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const login = async (req, res, next) => {
  try {
    const token = await User.auth(req);
    res.json({
      success: true,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

export { id, create, read, update, all, login };
