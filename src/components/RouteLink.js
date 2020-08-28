import React from 'react';
import { Link } from 'gatsby';
import { Box } from 'rebass/styled-components';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LinkAnimated from './LinkAnimated';
import colors from '../../colors';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.primaryLight};
`;

const RouteLink = ({ name }) => (
  <Box ml={[2, 3]} color="background" fontSize={[2, 3]}>
    <LinkAnimated tabIndex={0}>
      <StyledLink to={`/${name}/`}>{name}</StyledLink>
    </LinkAnimated>
  </Box>
);

RouteLink.propTypes = {
  name: PropTypes.string,
};

export default RouteLink;
