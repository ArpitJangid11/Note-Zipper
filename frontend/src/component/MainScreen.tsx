import { Container, Row } from "react-bootstrap"
import './MainScreen.css'
import './MainScreen.css';
import type { ReactNode } from "react";

interface MainScreenProps {
  title?: string;
  children: ReactNode;
}

const MainScreen = ({ title, children }: MainScreenProps) => {
  return (
    <div className="mainback">
        <Container>
            <Row>
                <div className="page">
                    {title &&(
                    <>
                    <h1 className="heading">{title}</h1>
                    <hr/>
                    </>
                    )}
                    {children}
                </div>
            </Row>
        </Container>

    </div>
  )
}
export default MainScreen