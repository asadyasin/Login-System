import axios from 'axios';

/** Authenticate Function */
export const authenticate = async (username) => {
    try {
      const response = await axios.post('/api/authenticate', { username });
      return response.data;
    } catch (error) {
      return { error: "User does not exist...!" };
    }
  };

/** Get User Details */
export const getUser = async ({username}) => {
    try {
            const { data } = await axios.get(`/api/user/${username}`);
            return { data };
        } catch (error) {
            return { error: "Password does not match...!" };
        }
}

/** Register User */
export const register = async (credentials) => {
  try {
    const response = await axios.post('/api/register', credentials);
    const { data: { msg }, status } = response;
    const { username, email } = credentials;

    if (status === 201) {
      await axios.post('/api/registermail', { username, userEmail: email, txt: msg });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error: "User already exists...!" });
  }
};

/** Login Function */

export const verifyPassword = async ({ username, password }) => {
    try {
      if (username) {
        const response = await axios.post('/api/login', { username, password });
        const { data } = response;
        return { data };
      }
    } catch (error) {
      return Promise.reject({ error: "Password does not match...!" });
    }
  };

/** Update user function */

export const updateUser = async (payload) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/updateUser', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { data } = response;
      return { data };
    } catch (error) {
      return Promise.reject({ error: "Could not update Profile...!" });
    }
  };

/** generate OTP */
export const generateOTP = async ({ username }) => {
  try {
    const { data: { code }, status } = await axios.post('/api/generateOTP', { username });
    if (status === 201) {
      const { data: { email } } = await getUser({ username });
      const text = `Your Password recovery OTP is ${code}. Verify and recover your password`;
      await axios.post('/api/registermail', { username, userEmail: email, text, subject: "Password recovery OTP" });
    }
    return code;
  } catch (error) {
    return Promise.reject(error);
  }
};

