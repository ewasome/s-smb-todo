import config from "../config";

export function getCurrentUser(): Promise<User> {
  // randomize user id to mock different logged users
  const id = Math.floor(Math.random() * 10) + 1;
  const url = `${config.api.users}/${id}`;

  return fetch(url).then((response) => response.json());
}

export function getUserDetails(id: string): Promise<User> {
  // get specific user data
  const url = `${config.api.users}/${id}`;
  return fetch(url).then((response) => response.json());
}

export default {
  getCurrentUser,
  getUserDetails,
};
