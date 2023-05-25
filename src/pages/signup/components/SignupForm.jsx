import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import Loading from "../../../utils/Loading";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import backendURL from "../../../config/backendURL";

const SignupForm = ({ setSignupSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const body = { user_email: data.user_email, user_password: data.user_password, user_name: data.user_name };
    try {
      setIsLoading(true);
      const response = await fetch(`${backendURL}/api/users/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
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
                <h3 className="login-title">Crie Sua Conta!</h3>
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
            <form onSubmit={handleSubmit(onSubmit)} className="form-login">
              <div className="row">
                <div className="col-12">
                  <input
                    className="form-control my-2"
                    type="string"
                    {...register("user_name", {
                      required: true,
                    })}
                    placeholder="Nome"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <input
                    className="form-control my-2"
                    {...register("user_email", {
                      required: true,
                    })}
                    placeholder="E-mail"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <input
                    className="form-control my-2"
                    type="password"
                    {...register("user_password", {
                      required: true,
                    })}
                    placeholder="Senha"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <input
                    className="form-control my-2"
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("user_repeatPassword", {
                      required: true,
                      validate: (value) => value === watch("user_password"),
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="user_repeatPassword"
                    message="Senhas devem coincidir"
                    render={({ message }) => (
                      <div className="alert alert-danger mt-3">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {message}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div>
                <div className="row mt-2 mb-3">
                  <div className="col-12">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <button className="btn-primary-kanboom form-control" type="submit">
                        cadastrar
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <p className="login-paragraph mb-0 text-center">
                  Já tem uma conta? Clique <Link to="/login">aqui</Link> para entrar.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignupForm;
