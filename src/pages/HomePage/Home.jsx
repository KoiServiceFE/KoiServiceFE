import { Container, Row, Col, Image } from 'react-bootstrap';
import "./Home.css";
import Service from '../ServicePage/Service';

export default function Home() {
  return (
    <>
      <div id="about">
        <Container>
          <Row>
            <Col lg={5} md={6}>
              <div className="about-col-left">
                <Image className="img-fluid" src="Images/about-us.jpg" rounded />
              </div>
            </Col>

            <Col lg={7} md={6}>
              <div className="about-col-right">
                <header className="section-header">
                  <h3>About Dr. Johnson</h3>
                </header>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam convallis quam sed tincidunt accumsan. Aliquam at
                  tincidunt tortor, ac porta turpis. Curabitur lacinia venenatis
                  semper.
                </p>
                <p>
                  Aliquam ut nibh ut lacus posuere facilisis. Vestibulum
                  ullamcorper arcu et bibendum ultrices. Suspendisse rutrum
                  turpis vitae.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <div className="about-col">
                <h4>Education</h4>
                <p>
                  Medical School - University of Dulton Health Science Center.
                </p>
                <p>
                  Residency in Family Medicine - University of Dulton Health
                  Science Center.
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <div className="about-col">
                <h4>Experience</h4>
                <p>
                  Medical School - University of Dulton Health Science Center.
                </p>
                <p>
                  Residency in Family Medicine - University of Dulton Health
                  Science Center.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Service/>
      <section id="team">
        <Container>
          <div className="section-header">
            <h3>Meet Your Fish Veterinarian</h3>
          </div>

          <Row>
            <Col md={4}>
              <div className="box8">
                <Image src="Images/team-1.jpg" alt="" rounded />
              </div>
              <h4>Maureen L. Reidy</h4>
              <span>Assistant Nurse</span>
              <p>
                Lorem ipsum dolor sit amet adipiscing elit. Proin consequat
                cursus sit amet elit proin consequat.
              </p>
            </Col>

            <Col md={4}>
              <div className="box8">
                <Image src="Images/team-2.jpg" alt="" rounded />
              </div>
              <h4>Janelle J. Hittle</h4>
              <span>Assistant Nurse</span>
              <p>
                Lorem ipsum dolor sit amet adipiscing elit. Proin consequat
                cursus sit amet elit proin consequat.
              </p>
            </Col>

            <Col md={4}>
              <div className="box8">
                <Image src="Images/team-3.jpg" alt="" rounded />
              </div>
              <h4>Michael C. Powell</h4>
              <span>Assistant Nurse</span>
              <p>
                Lorem ipsum dolor sit amet adipiscing elit. Proin consequat
                cursus sit amet elit proin consequat.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
