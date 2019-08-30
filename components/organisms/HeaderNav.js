import React, { useState, useEffect } from 'react';
import { Card, Box, Button, Flex, Heading } from 'rebass';
import styled from 'styled-components';
import { withMedia } from 'react-media-query-hoc';

import { Link, Container } from '../base';
import { getHeaderNav } from '../../api/landing';

const HeaderNavLink = styled(Link).attrs(props => ({
  level: props.level || 1,
}))`
  display: block;

  ${props =>
    props.level === 1 &&
    `
    position: relative;
    font-weight: bold;
    white-space: nowrap;
    padding: ${props.theme.space[2]}px;
    padding-right: ${props.theme.space[4]}px;

    &:hover {
      border-radius: ${props.theme.radii[2]}px;
      background-color: ${props.theme.colors.beige}
    }

    &:after {
      position: absolute;
      right: ${props.theme.space[2]}px;
      content: '>';
      font-weight: 300;
    }
  `}

  ${props =>
    props.level === 2 &&
    `
    font-weight: bold;
    color: ${props.theme.colors.primaryText}
  `}

  ${props =>
    props.level === 3 &&
    `
      color: ${props.theme.colors.grey}
    `}

`;

const HeaderToggleBase = ({ initialCategory, open, linksTree, ...props }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const toggleCategory = (id, event) => {
    if (event) {
      event.preventDefault();
    }

    setActiveCategory(id);
  };

  let activeSelection = null;

  if (activeCategory) {
    const activeCategoryLink = linksTree.reduce((current, link) => {
      if (link.id === activeCategory) {
        return link;
      }

      return current;
    }, null);

    const sortedWithChildFirst = activeCategoryLink.below.sort((a, b) =>
      b.below.length === 0 ? -1 : 0,
    );

    activeSelection = (
      <Flex alignSelf="flex-start" flexWrap="wrap" flex="1 1 75%" px={2}>
        {sortedWithChildFirst.map(child => {
          const subcategoriesBox = child.below.length > 0 && (
            <Box>
              {child.below.map(subcategory => (
                <HeaderNavLink level={3} fontSize={1} href={subcategory.url}>
                  {subcategory.title}
                </HeaderNavLink>
              ))}
            </Box>
          );

          return (
            <Box key={child.id} flex="0 0 33%" p={3}>
              <HeaderNavLink level={2} href={child.url}>
                {child.title}
              </HeaderNavLink>
              {subcategoriesBox}
            </Box>
          );
        })}
      </Flex>
    );
  }

  return (
    <Box {...props}>
      <Container>
        <Card flex="0 0 auto" borderRight="1px solid" borderColor="lightgrey">
          {linksTree.map(parent => (
            <HeaderNavLink
              level={1}
              fontSize={2}
              onClick={e => toggleCategory(parent.id, e)}
              my={2}
              key={parent.id}
              href={parent.url}
            >
              {parent.title}
            </HeaderNavLink>
          ))}
        </Card>
        {activeSelection}
      </Container>
    </Box>
  );
};

const HeaderToggle = styled(HeaderToggleBase)`
  position: absolute;
  top: 68px;
  left: 0px;
  z-index: 1;
  visibility: hidden;
  width: 100%;
  transform: translate3d(0px, -30px, 0px);
  opacity: 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px 0px, rgba(0, 0, 0, 0.06) 0px 2px 14px 0px;
  pointer-events: none;

  transition: visibility 0s ease-in 0.15s, opacity 0.15s ease-in 0s, transform 0.15s ease-in 0s;

  ${props =>
    props.open &&
    `
      visibility: visible;
      transform: translate3d(0px, 0px, 0px);
      opacity: 1;
      pointer-events: auto;
      transition: visibility 0s ease-out 0s, opacity 0.25s ease-out 0s, transform 0.25s ease-out 0s;
  `}

  @media ${props => props.theme.mediaQueries.large} {
    ${Container} {
      display: flex;
    }
  }
`;

HeaderToggle.defaultProps = {
  bg: 'white',
};

const HeaderNavBase = ({ media, label, ...props }) => {
  const [open, setOpen] = useState(false);
  const [linksTree, setLinksTree] = useState([]);

  useEffect(() => {
    const fetchNavLinks = async () => {
      const result = await getHeaderNav();

      setLinksTree(result);
    };

    fetchNavLinks();
  }, []);

  const toggle = () => setOpen(!open);

  if (!linksTree || linksTree.length === 0) {
    return null;
  }

  return (
    <Box {...props} as="nav" aria-label={label}>
      <Container bg="white" css={{ position: 'relative', zIndex: 2 }}>
        <Flex justifyContent="space-between" alignItems="center">
          <Button variant="primary" onClick={toggle}>
            Все услуги
          </Button>
          {media.large &&
            linksTree.map(link => (
              <Link color="primaryText" key={link.id} href={link.url}>
                {link.title}
              </Link>
            ))}
        </Flex>
      </Container>
      <HeaderToggle
        initialCategory={media.large ? linksTree[0].id : null}
        linksTree={linksTree}
        open={open}
      />
    </Box>
  );
};

const HeaderNav = styled(HeaderNavBase)`
  position: relative;
`;

HeaderNav.defaultProps = {
  py: 3,
  bg: 'white',
};

export default withMedia(HeaderNav);
