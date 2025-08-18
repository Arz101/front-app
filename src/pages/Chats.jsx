import { Container, Card, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";


export default function Chats() {
    const token = localStorage.getItem("token");
    const [chats, setChats] = useState([]);  // Estado para los chats
    
    useEffect(() => {
        async function getChats ()  {
            console.log("Comming...")
        }
        getChats();
    }, [token]);


    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Chats</Card.Title>
                    <ul>
                        {chats?.map((chat, idx) => (
                            <li key={idx}>
                                <a href={"/chat"}>{chat}</a>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}