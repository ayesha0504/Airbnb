import React from 'react'
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Footer() {
  
  return (
    <div>
    <footer id="footer">
        <Container>
        <ul className="nav justify-content-center list-unstyled d-flex" >
        <li className="text">&copy; 2021 Company, Inc</li>
        <li className="ms-3"><a className="text-muted" href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
        <li className="ms-3"><a className="text-muted" href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
        <li className="ms-3"><a className="text-muted" href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
        </ul>
        </Container>
    </footer>
    </div>
  );
}

export default Footer;
