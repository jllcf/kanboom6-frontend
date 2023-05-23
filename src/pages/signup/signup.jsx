import { useState } from "react";

import WebFont from "webfontloader";
import SignupForm from "./components/SignupForm";
import SignupSuccess from "./components/SignupSuccess";

WebFont.load({
  google: {
    families: ["Roboto"],
  },
});

const Signup = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!signupSuccess) {
    return <SignupForm setSignupSuccess={setSignupSuccess} />;
  }

  return <SignupSuccess />;
};

export default Signup;
