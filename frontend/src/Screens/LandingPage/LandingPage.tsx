
import { Button, Container, Row } from 'react-bootstrap'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className='main'>
      <Container>
        <Row>
            <div className='intro-text'>
                <div>
                    <h1 className='title'>
                        Welcome to Note Zipper
                    </h1>
                    <p className='subtitle'>One safe place for your all notes.</p>
                    <div className='buttonContainer'>
                        <a href='/login'>
                            <Button size='lg' className='landingbutton'>
                                Login
                            </Button>
                        </a>
                        <a href='/register'>
                            <Button size='lg' className='landingbutton' variant='outline-primary'>
                                Signup
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
