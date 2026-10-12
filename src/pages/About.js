import React from 'react';
import styled from 'styled-components';

const AboutBlock = styled.div`
  padding: 30px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2563eb;
`;

const Text = styled.p`
  color: #475569;
  font-size: 18px;
`;

function About() {
  return (
    <AboutBlock>
      <Title>Про нас</Title>
      <Text>Це сторінка про наш React-застосунок.</Text>
    </AboutBlock>
  );
}

export default About;