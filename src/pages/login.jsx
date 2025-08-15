import { use, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import apiClient from "../services/api";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await apiClient.post("/user/login", {
                username,
                password
            },
            {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded' 
                },
                withCredentials: true
            })
            

            const token = res.data.access_token;
            console.log(token)
            localStorage.setItem('token', token);

            navigate(`/profile/${username}`);
        }
        catch (err) {
            if (err.response) {
                console.log("Respuesta del servidor:", err.response.status, err.response.data);
                setError("Credenciales incorrectas");
            } else if (err.request) {
                console.log("No se recibió respuesta del servidor", err.request);
                setError("No se pudo conectar con el servidor");
            } else {
                console.log("Error al configurar la solicitud", err.message);
                setError("Error inesperado");
            }
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Iniciar Sesión</Card.Title>

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button variant="primary" type="submit" className="w-100">
                            Ingresar
                        </Button>
                        <div className="d-flex justify-content-center mt-3">
                            <a href="/Register">Register</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}