import { BsChevronCompactDown } from 'react-icons/bs';
import Header from '@/components/Header';
import TextAccent from '@/components/TextAccent';
import { Button } from '@/components/Button';
import {
  HeroSection,
  HeroContent,
  Title,
  Subtitle,
  ArrowContainer,
} from '@/components/PageStyles/HomeStyles';
import { Theme } from '@/styles/theme';

const Home: React.FC = () => {
  return (
    <main>
      <HeroSection>
        <Header />

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
    </main>
  );
};

export default Home;
