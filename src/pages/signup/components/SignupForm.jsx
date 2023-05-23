import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";

const SignupForm = ({ setSignupSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users/", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const parseResponse = await response.json();
      if (parseResponse.type === "success") {
        setSignupSuccess(true);
      } else {
        setError("root.serverError", {
          type: "400",
          message: parseResponse.message,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar formulário", error);
    }
  };

  console.log(errors);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const passwordMatch = password === confirmPassword;
  return (
    <Fragment>
      <div className="top">
        <div className="databox">
          <img src={logo} alt="Logo" />
          <div id="title">
            <h3> Crie sua conta! </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-login">
            <input className="input" type="string" {...register("user_name")} placeholder="Nome" required />
            <div className="row">
              <input className="input" {...register("user_email")} placeholder="E-mail" required />
            </div>
            <div>
              <input
                className="input"
                type="password"
                {...register("user_password")}
                placeholder="Senha"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <input
                className="input"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && <span>As senhas não coincidem</span>}
            </div>
            <div>
              <button className="button" type="submit">
                Entrar
              </button>
            </div>
            <div className="footer">
              <p> Já tem uma conta? Clique </p> <a href="#">aqui</a>
            </div>
          </form>
          {errors && errors?.root?.serverError?.message && (
            <div>
              <ul>
                {errors.root.serverError.message.map((error, index) => (
                  <li key={`error-${index}`}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SignupForm;
