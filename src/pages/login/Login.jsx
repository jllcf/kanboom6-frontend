import { useState } from "react";
import logo from "../../assets/logo.png";
import Loading from "../../utils/Loading";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backendURL from "../../config/backendURL";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/login/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const parseResponse = await response.json();
      if (parseResponse.type === "success") {
        localStorage.setItem("token", parseResponse.token);
        navigate("/");
      } else {
        setError("root.serverError", {
          type: "401",
          message: parseResponse.message,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar formulário", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-4 bg-white rounded-2 my-3 credential-panel">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img className="img" src={logo} alt="logo" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <h3 className="card-title">Fazer Login no Kanboom</h3>
            </div>
          </div>
          {errors && errors?.root?.serverError?.message && (
            <div className="alert alert-danger mt-3">
              <ul className="d-flex  align-items-center mb-0 p-0">
                {[errors.root.serverError.message].map((error, index) => (
                  <li className="list-group-item" key={`error-${index}`}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <input
                  type="email"
                  name="email"
                  className="form-control my-2"
                  placeholder="E-mail"
                  {...register("user_email", {
                    required: true,
                  })}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <input
                  type="password"
                  name="password"
                  className="form-control my-2"
                  placeholder="Senha"
                  {...register("user_password", {
                    required: true,
                  })}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="row mt-2 mb-3">
              <div className="col-12">
                {isLoading ? (
                  <Loading />
                ) : (
                  <button className="btn-primary-kanboom form-control" type="submit">
                    entrar
                  </button>
                )}
              </div>
            </div>
          </form>
          <div className="mb-2">
            <div className="row">
              <div className="col-12 d-flex justify-content-center text-center">
                <Link to="/" className="login-paragraph mb-0">
                  Esqueci Minha Senha
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-center text-center">
                <Link to="/cadastro" className="login-paragraph mb-0 text-decoration-none">
                  Ainda não tem uma conta? Clique <span className="text-decoration-underline">aqui</span>.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
