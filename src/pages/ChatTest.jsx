import { useEffect, useRef, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ChatTest() {
    const token = localStorage.getItem('token')
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);  // Estado para los mensajes recibidos

    const ws = useRef(null);  // Referencia persistente para el WebSocket
    // Se ejecuta solo una vez cuando se monta el componente

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/chat/to?token=${token}`);
        ws.current = socket;  // Asignar el WebSocket a la referencia

        ws.current.onmessage = (event) => {
            setMessages(prev => [...prev, event.data]);  // Agrega el nuevo mensaje al estado
        };
        
        socket.onopen = () => console.log("WS conectado");
        socket.onerror = err => console.error("WS error:", err);
    }, []);

    // Enviar mensaje al servidor WebSocket
    async function sendMessage(event) {
        event.preventDefault();
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(message);
            setMessage("");  // Limpiar input
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Web Socket Chat</Card.Title>

                    <Form onSubmit={sendMessage}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Mensaje"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit" className="w-100">Send</Button>
                        </div>
                    </Form>

                    <ul>
                        {messages.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>

                </Card.Body>
            </Card>
        </Container>
    );
}
