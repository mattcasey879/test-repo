import jwt_decode from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("AuthenticationToken");
};

export const removeToken = () => {
  localStorage.removeItem("AuthenticationToken")
}

export const isTokenExpired = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwt_decode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  }
  return false;
};

export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.ROLE;
  }
  return null;
};

export const formatLabel = (label) => {
  return label
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, label[0].toUpperCase());
};
