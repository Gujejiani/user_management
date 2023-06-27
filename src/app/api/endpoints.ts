import { environment } from 'src/environments/environment';
import { MOEndpoint } from './../models/endpoint';

export const GET_USERS: MOEndpoint = {
  api: 'users',
  method: 'GET',
};

export const CREATE_USER: MOEndpoint = {
  api: 'users/register',
  method: 'POST',
};

export const PHOTO_URL: MOEndpoint = {
  api: environment.photoEndPoint + 'img/users/',
  method: 'GET',
};
export const UPDATE_USER: MOEndpoint = {
  api: 'users',
  method: 'PATCH',
  param: true,
};

export const DELETE_USER: MOEndpoint = {
  api: 'users',
  method: 'DELETE',
  param: true,
};
