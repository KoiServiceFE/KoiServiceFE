import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './About.css';

export default function About() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPerson = queryParams.get('person') || 'Johnson';
  
  const [currentPerson, setCurrentPerson] = useState(initialPerson);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPerson]);

  const teamMembers = [
    {
      name: "Janelle J. Hittle",
      image: "Images/team-2.jpg",
      bio: "Janelle has over 7 years of animal care experience, focusing on both Koi and other aquatic species. She has developed a deep understanding of their behavior and health needs, and her passion for animal welfare drives her to continually educate herself on the latest veterinary practices. Janelle has worked with various aquaculture facilities, where she has implemented programs for disease prevention and health monitoring. She enjoys collaborating with clients to create customized care plans that ensure the well-being of their aquatic pets.",
      education: "Bachelor's Degree in Animal Science from the University of Florida.",
      expertise: "Animal Care, Aquatic Species Health, Client Education",
      id: "Janelle"
    },
    {
      name: "Michael C. Powell",
      image: "Images/team-3.jpg",
      bio: "Michael is known for his expertise in aquatic animal surgery and has been a valuable team member for 4 years. His surgical skills are complemented by his commitment to providing the highest level of care for all aquatic species. Michael has participated in numerous advanced training programs and workshops to refine his techniques in surgery and anesthesia. He is also dedicated to educating pet owners about preventive care and the importance of regular health check-ups for their aquatic friends. Outside of work, Michael enjoys diving and exploring marine ecosystems.",
      education: "DVM from Michigan State University.",
      expertise: "Aquatic Surgery, Emergency Care, Koi Disease Management",
      id: "Michael"
    },
    {
      name: "Maureen L. Reidy",
      image: "Images/team-1.jpg",
      bio: "Maureen has been a veterinarian for over 10 years, specializing in aquatic health and nutrition. Her extensive background in veterinary medicine allows her to address a wide range of health issues in aquatic species. Maureen has conducted significant research in nutrition, focusing on the dietary needs of Koi fish and other aquatic animals to optimize their health and longevity. She frequently publishes her findings in veterinary journals and presents at international conferences. In her role, she emphasizes the importance of proper diet and habitat management, while also being an active member of various veterinary associations.",
      education: "PhD in Veterinary Medicine from Cornell University.",
      expertise: "Aquatic Health, Nutrition, Research",
      id: "Maureen"
    },
    {
      name: "Dr. Johnson - Koi Fish Specialist",
      image: "Images/about-us.jpg",
      bio: "Dr. Johnson has dedicated his career to the study and treatment of Koi fish, bringing 15 years of experience. He has a unique approach that combines traditional veterinary practices with innovative treatment methods tailored for Koi. Dr. Johnson has been instrumental in advancing the understanding of Koi health and breeding, and he regularly consults for koi farms and private collectors alike. He is passionate about educating both clients and the veterinary community on the complexities of Koi care, often leading workshops and seminars. His commitment to the field extends beyond his practice, as he actively participates in conservation efforts for aquatic species.",
      education: "DVM from the University of California, Davis.",
      expertise: "Koi Fish Care, Research, Aquatic Medicine",
      id: "Johnson"
    }
  ];

  const getPersonInfo = (id) => {
    return teamMembers.find(member => member.id === id);
  };

  const personInfo = getPersonInfo(currentPerson);

  const handleImageClick = (personId) => {
    navigate(`?person=${personId}`);
    setCurrentPerson(personId);
  };

  return (
    <Container className="about-page py-5">
      <Row className="mb-5">
        <Col lg={4}>
          <Image 
            src={personInfo.image} 
            rounded 
            fluid 
            className="mb-4 image-hover"
          />
        </Col>
        <Col lg={8}>
          <h2 className="teamName mb-4">{personInfo.name}</h2>
          <p className="lead">{personInfo.bio}</p>
          <h5 className="mt-4">Education:</h5>
          <p>{personInfo.education}</p>
          <h5 className="mt-4">Expertise:</h5>
          <p>{personInfo.expertise}</p>
        </Col>
      </Row>
      <Row className="teamMem">
        {teamMembers
          .filter(member => member.id !== currentPerson)
          .map(member => (
            <Col key={member.id} lg={4} className="mb-4">
              <Image 
                src={member.image} 
                rounded 
                fluid 
                className="mb-2 image-hover" 
                onClick={() => handleImageClick(member.id)}
              />
              <h4>{member.name}</h4>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
