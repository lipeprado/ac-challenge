import axios from "axios";

export const KEY = "d22e73cf48620b6a39c8a09043d7f9ba";

export const Api = axios.create({
  baseURL: "http://api.ipstack.com"
});
