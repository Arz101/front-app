import { use, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';
import apiClient from "../services/api";

export default function Register() {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {

            if (password.length < 8) {
                setError("La contraseña debe tener al menos 8 caracteres");
                return;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                setError("El usuario solo puede contener letras, números y guiones bajos");
                return;
            }

            await apiClient.post("/user/register",{
                username,
                email,
                password,
                "Info" : {
                    name,
                    lastname,
                    gender,
                    phone,
                    birthday
                }
            })

            if(avatar != null){
                await apiClient.post("")
            }
            
            

            navigate("/")
        } catch (err) {
            alert(err)
            console.log("Error:", err);
            setError("Valores Incorrectos")
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card style={{ width: '32rem' }}>
                <Card.Body className="p-4">
                    <Card.Title className="text-center">Register</Card.Title>


                    <Form onSubmit={handleRegister}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" children="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="birthday">
                            <Form.Control
                                type="date"
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="gender">
                                    <Card className="p-2">
                                        <Form.Check
                                            type="radio"
                                            label="Masculino"
                                            name="genero"
                                            value="M"
                                            checked={gender === "M"}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </Card>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="gender">
                                    <Card className="p-2">
                                        <Form.Check
                                            type="radio"
                                            label="Femenino"
                                            name="genero"
                                            value="F"
                                            checked={gender === "F"}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </Card>
                                </Form.Group>
                            </Col>
                        </Row>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit" className="w-10">Register</Button>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <a href="/">Login</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )


}