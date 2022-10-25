import axios from 'axios';
import { ContactType } from './interfaces';

export const getContacts = async (): Promise<ContactType[]> => {
  try {
    const endpoint =
      'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json';

    const { data } = await axios.create().get(endpoint);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};
