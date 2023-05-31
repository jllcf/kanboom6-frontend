import  { Fragment, useState } from 'react';
import logo from '../../assets/logo.png';
import Loading from '../../utils/Loading';
import backendURL from '../../config/backendURL';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Enviar a solicitação para recuperar a senha para o backend
    try {
      const response = await fetch(`${backendURL}/api/login/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, senha }), // Envie o email e a senha corretamente
      });

      const data = await response.json();
      alert(data.message); // Exibir a mensagem de confirmação
      // Redirecionar para a página de login
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
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
                <h3 className="login-title">Esqueceu a senha?</h3>
              </div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <input
                    type="email"
                    name="email"
                    className="form-control my-2"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange}
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
                    value={senha}
                    onChange={handleSenhaChange}
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
                      Enviar
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecuperarSenha;
