import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Service from "../ServicePage/Service";

export default function Home() {
  const navigate = useNavigate();

  const handleReadMoreClick = (person) => {
    navigate(`/about?person=${person}`);
  };

  return (
    <>
      <div id="about">
        <Container>
          <Row>
            <Col lg={5} md={6}>
              <div className="about-col-left">
                <Image
                  className="img-fluid"
                  src="Images/about-us.jpg"
                  rounded
                />
              </div>
            </Col>

            <Col lg={7} md={6}>
              <div className="about-col-right">
                <header className="section-header">
                  <h3>About Dr. Johnson</h3>
                </header>

                <p>
                  Dr. Johnson is a highly experienced veterinarian specializing
                  in Koi fish care. With over 15 years of experience, he has
                  treated hundreds of Koi fish, ensuring their health and
                  well-being.
                </p>
                <p>
                  Dr. Johnson is passionate about educating fish owners on how
                  to properly care for their pets, offering both preventive and
                  specialized treatment services.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => handleReadMoreClick("Johnson")}
                >
                  Read More
                </button>
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
      <Service />
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
                Maureen has been working with Dr. Johnson for the past 5 years.
                She specializes in post-treatment care for aquatic animals.
              </p>
              <button
                className="btn-primary mb-5"
                onClick={() => handleReadMoreClick("Maureen")}
              >
                Read More
              </button>
            </Col>

            <Col md={4}>
              <div className="box8">
                <Image src="Images/team-2.jpg" alt="" rounded />
              </div>
              <h4>Janelle J. Hittle</h4>
              <span>Assistant Nurse</span>
              <p>
                Janelle has over 7 years of animal care experience, focusing on
                both Koi and other aquatic species with a highly skilled
              </p>
              <button
                className="btn-primary mb-5"
                onClick={() => handleReadMoreClick("Janelle")}
              >
                Read More
              </button>
            </Col>

            <Col md={4}>
              <div className="box8">
                <Image src="Images/team-3.jpg" alt="" rounded />
              </div>
              <h4>Michael C. Powell</h4>
              <span>Assistant Nurse</span>
              <p>
                Michael is known for his expertise in aquatic animal surgery and
                has been a valuable team member for 4 years.
              </p>
              <button
                className="btn-primary mb-5"
                onClick={() => handleReadMoreClick("Michael")}
              >
                Read More
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
