import { Container, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api";


export default function Chats() {
    const token = localStorage.getItem("token");
    const [chats, setChats] = useState([]);  // Estado para los chats
    
    useEffect(() => {
        async function getChats ()  {
            try {
                const request = await apiClient.get("/chat/all", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    withCredentials: true
                });
                setChats(request.data.usernames);  // Asignar los chats al estado
            } catch (error) {
                console.error(error);
            }
        }
        getChats();
    }, [token]);


    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Chats</Card.Title>
                    <ul>
                        {chats.map((chat, idx) => (
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