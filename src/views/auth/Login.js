import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FORM from "../../assets/img/Form.png";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
const MySwal = withReactContent(Swal)

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("demogallo")
    const [password, setPassword] = useState("demog@ll0")
    const [userName, setUserName] = useState("")
    const [dpiValue, setDpiValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const Login = async () => {
        try {
            setIsLoading(true)
            const login = await axios.post("http://localhost:4500/settings/v1/user/login", { user, password })
            console.log("LOGIN", login.data);
            if (!login.data?.error) {
                setIsLoading(false)
                navigate("/home")
            } else {
                setIsLoading(false)
                MySwal.fire({
                    title: "¡Atención!",
                    text: login.data.message || "comuniquese con el administrador",
                    icon: "info"
                });
            }
        } catch (error) {
            setIsLoading(false)
            console.log("[ ERROR LOGIN ] =>", error)
        }
    }
    return (
        <>
            <header className="text-center text-white d-none d-lg-flex position-relative" style={{ backgroundColor: "#E70202" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-11 offset-md-1 position-relative">
                            <img src={"https://res.cloudinary.com/dwjgahuls/image/upload/f_auto,q_auto/v1/CBC/uhp5idkrb3zf0w9n1h0h"} className="img-fluid" alt="Header" />
                            <div className="position-absolute end-0 translate-middle" style={{ top: "70%", transform: 'translate(-50%, -20%)' }}>
                                <h1 className="fs-1">LÍDERES DEL MERCADO</h1>
                                <h3 className="fs-3">LIDERANDO GRANDES MARCAS</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="d-flex d-flex justify-content-center" style={{ backgroundColor: "#E70202" }}>
                <div style={{ paddingBottom: "100vh" }} className="container my-5">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="mb-3 border border-3 border-withe">
                            <div className="row g-0">
                                <div className="col-md-5 d-flex align-items-center">
                                    <div>
                                        <img src={FORM} className="img-fluid" alt="..." />
                                        <h3 className="text-white text-center">Líderes del Mercado</h3>
                                        <h3 className="text-white text-center">Liderando grandes marcas</h3>
                                    </div>
                                </div>
                                <div className="col-md-7" style={{ backgroundColor: "#CCCCCC" }}>
                                    {
                                        !isRegister ? (
                                            <div className="card-body">
                                                <h3 className="fw-bold m-5">Login</h3>
                                                <div className="m-5">
                                                    <div>
                                                        <label className="form-label">Usuario</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            aria-label=".form-control-sm example"
                                                            type="text"
                                                            placeholder="Usuario"
                                                            value={user}
                                                            onChange={({ target }) => setUser(target.value)}
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="form-label">Contraseña</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            type="password"
                                                            placeholder="Contraseña"
                                                            aria-label=".form-control-sm example"
                                                            value={password}
                                                            onChange={({ target }) => setPassword(target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-check mt-2">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label">
                                                            Mantener conectado
                                                        </label>
                                                    </div>
                                                    <div className="text-center">
                                                        <button
                                                            type="button"
                                                            style={{ backgroundColor: "#810000", borderColor: "#810000", paddingInline: "20%" }}
                                                            className="btn btn-primary btn-md mt-4"
                                                            onClick={Login}
                                                            disabled={isLoading}
                                                        >
                                                            {
                                                                isLoading ? (
                                                                    <div className="d-flex justify-content-center fs-6">
                                                                        <div className="spinner-border text-light" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                ) : ("Ingresar")
                                                            }
                                                        </button>
                                                    </div>
                                                    <div className="text-center mt-5 d-grid gap-2">
                                                        <h6 className="fw-bold">¿Aún no tienes cuenta?</h6>
                                                        <button
                                                            type="button"
                                                            style={{ backgroundColor: "#810000", borderColor: "#810000" }}
                                                            className="btn btn-primary btn-md px-5 rounded-pill"
                                                            onClick={() => setIsRegister(true)}
                                                        >
                                                            Crea una aquí
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="card-body">
                                                <h3 className="fw-bold m-5">Registro de usuario</h3>
                                                <div className="m-5">
                                                    <div>
                                                        <label className="form-label fw-semibold">Nombre Completo</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            type="text"
                                                            placeholder="Nombre Completo"
                                                            aria-label=".form-control-sm example"
                                                            value={userName}
                                                            onChange={({ target }) => setUserName(target.value)}
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="form-label fw-semibold">DPI</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            type="tel"
                                                            pattern="[0-9]"
                                                            placeholder="DPI"
                                                            aria-label=".form-control-sm example"
                                                            value={dpiValue}
                                                            onChange={({ target }) => setDpiValue(target.value)}
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="form-label fw-semibold">Usuario</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            type="text"
                                                            placeholder="Usuario"
                                                            aria-label=".form-control-sm example"
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="form-label fw-semibold">Contraseña</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            type="password"
                                                            placeholder="constraseña"
                                                            aria-label=".form-control-sm example"
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="form-label fw-semibold">Confirmar la contraseña</label>
                                                        <input
                                                            className="form-control form-control-md rounded-pill"
                                                            type="password"
                                                            placeholder="confirmar contraseña"
                                                            aria-label=".form-control-sm example"
                                                        />
                                                    </div>
                                                    <div className="text-center mt-5">
                                                        <button
                                                            type="button"
                                                            style={{ backgroundColor: "#810000", borderColor: "#810000", paddingInline: "20%" }}
                                                            className="btn btn-primary btn-md"
                                                        >
                                                            Registrar
                                                        </button>
                                                    </div>
                                                    <div className="text-center mt-5 d-grid gap-2">
                                                        <h6 className="fw-bold">¿Ya tienes cuenta?</h6>
                                                        <button
                                                            type="button"
                                                            style={{ backgroundColor: "#810000", borderColor: "#810000" }}
                                                            className="btn btn-primary btn-md px-5 rounded-pill"
                                                            onClick={() => setIsRegister(false)}
                                                        >
                                                            Ingresar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;