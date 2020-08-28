import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Heading, Flex, Box, Text } from 'rebass/styled-components';
import TextLoop from 'react-text-loop';
import { SectionLink } from 'react-scroll-section';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Triangle';
import colors from '../../colors';

const ImageBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -2;
  opacity: 0.5;
  filter: grayscale(80%);

  ${(props) => {
    return `background: url(${props.image}) center center/cover no-repeat fixed`;
  }}
`;

const Background = (image) => () => (
  <div>
    <ImageBackground image={image} />
    <Triangle
      color={colors.backgroundDark}
      opacity="aa"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color={colors.secondary}
      opacity="aa"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color={colors.primaryDark}
      opacity="44"
      height={['165vh', '165vh']}
      width={['90vw', '90vw']}
      invertX
    />

    <Triangle
      color={colors.backgroundDark}
      opacity="aa"
      height={['15vh', '20vh']}
      width={['110vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const centerHorizontally = { marginRight: 'auto', marginLeft: 'auto' };

const LandingPage = () => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        contentfulAbout {
          name
          roles
          socialLinks {
            id
            url
            name
            fontAwesomeIcon
          }
          profile {
            title
            image: resize(width: 450, quality: 100) {
              src
            }
          }
        }
        contentfulSection {
          background {
            resize(width: 1080, quality: 100) {
              src
            }
          }
        }
        site {
          siteMetadata {
            deterministicBehaviour
          }
        }
      }
    `}
    render={({ contentfulAbout, contentfulSection, site }) => {
      const { name, socialLinks, roles } = contentfulAbout;
      const { background } = contentfulSection;
      const { deterministicBehaviour } = site.siteMetadata;
      return (
        <Section.Container
          id="home"
          Background={Background(background.resize.src)}
          style={{ backgroundColor: 'black', zIndex: -2 }}
        >
          <Fragment>
            <Heading
              textAlign="center"
              as="h1"
              color="primary"
              fontSize={[6, 7, 8]}
              mb={[3, 4, 5]}
            >
              {`${name}`}
            </Heading>

            <Heading
              as="h2"
              color="primary"
              fontSize={[5, 6]}
              mb={[3, 5]}
              textAlign="center"
              style={centerHorizontally}
            >
              <TextLoop interval={5000}>
                {roles
                  .sort(() => deterministicBehaviour || Math.random() - 0.5)
                  .map((text) => (
                    <Text width={[300, 500]} key={text}>
                      {text}
                    </Text>
                  ))}
              </TextLoop>
            </Heading>

            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              {socialLinks.map(({ id, ...rest }) => (
                <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                  <SocialLink {...rest} />
                </Box>
              ))}
            </Flex>
            <SectionLink section="about">
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Fragment>
        </Section.Container>
      );
    }}
  />
);

export default LandingPage;
