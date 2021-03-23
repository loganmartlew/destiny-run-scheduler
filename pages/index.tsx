import { BsChevronCompactDown } from 'react-icons/bs';
import TextAccent from '@/components/TextAccent';
import { Button } from '@/components/Button';
import {
  HeroSection,
  HeroContent,
  Title,
  Subtitle,
  ArrowContainer,
} from '@/components/PageStyles/HomeStyles';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <Title>
            When Are <TextAccent>Runs?</TextAccent>
          </Title>
          <Subtitle>Always know when your team can run</Subtitle>

          <Button as='a' size='lg'>
            Learn More
          </Button>
        </HeroContent>

        <ArrowContainer>
          <BsChevronCompactDown />
        </ArrowContainer>
      </HeroSection>
    </>
  );
};

export default Home;
