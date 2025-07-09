import { createContext } from "react";

const TokenContext = createContext({
  token: null,
  setToken: () => {},
});

export default TokenContext;
