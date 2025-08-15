import axios from "axios";
import { useState } from "react";
import { Card, Container, Form , Row, Col} from "react-bootstrap"



export default function ModifierInfo() {
    const [name, SetName] = useState("Hola")


    const handleModifier = async () => {
        
    }

    return (
        <Container className="d-flex align-items-center justify-content-center mt-3">
            <Card style={{width:'50rem'}}>
                <Card.Body>
                    <Card.Title className="text-center">Mod</Card.Title>

                    <Form onSubmit={handleModifier}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={name}
                                        value={name}
                                        onChange={(e) => SetName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    );
}