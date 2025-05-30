import {
  registerService,
  loginService,
  refreshService,
  logoutService,
} from '../services/auth.js';

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: userObj,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await loginService(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await refreshService(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await logoutService(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
