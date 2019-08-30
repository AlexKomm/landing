import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Card } from 'rebass';
import styled, { keyframes, css } from 'styled-components';
import { variant } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { withMedia } from 'react-media-query-hoc';
import { Logo, UserIcon, MenuIcon } from '../molecules';
import { Link } from '../base';
import withCurrentUser from '../../helpers/withCurrentUser';
import { getNav } from '../../api/landing';

const animateOpen = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(90deg);
  }
`;

const animateClose = keyframes`
  from {
    transform: rotate(90deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const animation = css`
  animation: ${props => (props.toggle ? animateOpen : animateClose)} 0.2s linear forwards;
`;

const AnimatingMenuIcon = styled(MenuIcon)`
  ${props => props.toggle !== null && animation}
`;

const cardVariants = variant({
  // theme key for variant definitions
  scale: 'cards',
  // component prop
  prop: 'variant',
});

const UserLinksMenuBase = ({
  currentUser,
  mobile = false,
  opened = false,
  width = 250,
  userLinks = [],
  ...props
}) => {
  if (!mobile && !userLinks.length) {
    return null;
  }

  return (
    <Card width={width} variant="white" {...props}>
      {mobile && !currentUser && (
        <Text textAlign="center">
          <Link href="/user/login" title="Войти">
            Войти
          </Link>
        </Text>
      )}
      {userLinks.map(link => (
        <Link variant="blackGreen" href={link.url} title={link.title}>
          {link.title}
        </Link>
      ))}
    </Card>
  );
};

const openMobileUserMenu = keyframes`
  from {
    transform: translateY(-120%);
  }

  to {
    transform: translateY(0);
  }
`;

const openUserMenu = keyframes`
  from {
   transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
`;

const closeUserMenu = keyframes`
  from {
    transform: scaleY(1);
  }

  to {
    transform: scaleY(0);
  }
`;

const userMenuAnimation = css`
  animation: ${props => (props.toggle ? openUserMenu : closeUserMenu)} 0.2s linear forwards;
`;

const UserLinksMenu = styled(UserLinksMenuBase)`
  position: absolute;
  z-index: 2;
  top: 65px;
  right: 0;

  ${Link} {
    display: block;
    font-weight: 400;
    padding: ${themeGet('space.3')}px;
    border-bottom: 0.5px solid ${themeGet('colors.lightgrey')};
  }

  ${Link}:last-child {
    border-bottom: none;
  }

  transform: scaleY(0);
  transform-origin: top;

  ${props => props.toggle !== null && userMenuAnimation}
`;

const MainNavigationBase = ({ linkColor, mainNav, ...props }) => (
  <Text {...props} as="nav" role="navigation">
    <Box as="ul">
      {mainNav.map(navItem => (
        <Box as="li">
          <Link variant={linkColor} p="0.5em" href={navItem.url} title={navItem.title}>
            {navItem.title}
          </Link>
        </Box>
      ))}
    </Box>
  </Text>
);

const MainNavigation = styled(MainNavigationBase)`
  ul,
  li {
    list-style: none;
    display: inline-block;
    white-space: nowrap;
  }
`;

const HeaderWrapper = styled.div.attrs(({ sticky }) => ({
  sticky,
}))`
  position: ${({ sticky }) => (sticky ? 'fixed' : 'absolute')};
  z-index: 3;
  padding: 0 ${props => props.theme.space[3]}px;
  top: 0;
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${cardVariants};
`;

const HeaderBase = ({
  mainNav = [],
  transparent = true,
  sticky = true,
  currentUser,
  media,
  onCreateOrderButtonClick,
  ...props
}) => {
  const headerRef = React.createRef();

  const [isTransparent, setTransparent] = useState(transparent);
  const [isSticky, setSticky] = useState(sticky);
  const [userLinks, setUserLinks] = useState(null);
  const [showUserMenu, toggleUserMenu] = useState(null);

  const onScroll = e => {
    if (!headerRef.current) {
      return;
    }

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    const headerHeight = headerRef.current.getBoundingClientRect().height;

    const toggleSticky = scrollTop > headerHeight + 100;

    if (isTransparent !== !toggleSticky) {
      setTransparent(!toggleSticky);
    }

    if (isSticky !== toggleSticky) {
      setSticky(toggleSticky);
    }
  };

  const toggleMenu = e => {
    toggleUserMenu(!showUserMenu);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll, false);

    return () => {
      document.removeEventListener('scroll', onScroll, false);
    };
  });

  useEffect(() => {
    const fetchNav = async () => {
      const userLinksResult = await getNav(null, 'user_links');
      setUserLinks(userLinksResult);
    };

    if (currentUser) {
      fetchNav();
    } else {
      setUserLinks([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      toggleUserMenu(null);
    };
  }, [media]);

  if (!userLinks) {
    return null;
  }

  if (media.large) {
    return (
      <>
        <HeaderWrapper
          ref={headerRef}
          sticky={isSticky}
          variant={isTransparent ? 'transparent' : 'white'}
        >
          <Logo flex="0 0 auto" py={3} mr={3} />
          <MainNavigation
            fontSize={[0, 0, 1]}
            mr={3}
            mainNav={mainNav}
            linkColor={isTransparent ? 'whiteGreen' : 'blackGreen'}
          />
          <Text fontSize={[0, 0, 1]} textAlign="center" mr={3}>
            <Link href="tel:88005006865" css={{ whiteSpace: 'nowrap' }}>
              8 (800) 500-68-65
            </Link>
            <Text fontWeight="300" color={isTransparent ? 'white' : 'primaryText'}>
              Пн–Вс, 9:00–21:00
            </Text>
          </Text>
          <Button
            ml="auto"
            mr={3}
            fontSize={[0, 0, 1]}
            variant="primary"
            onClick={onCreateOrderButtonClick}
          >
            {media.xlarge ? 'Разместить заявку' : '+'}
          </Button>
          {currentUser && (
            <Box flex="0 0 auto" py={3} onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
              <UserIcon icon={currentUser.image} />
              <UserLinksMenu
                currentUser={currentUser}
                toggle={showUserMenu}
                userLinks={userLinks}
              />
            </Box>
          )}
          {!currentUser && <Link href="/user/login">Войти</Link>}
        </HeaderWrapper>
      </>
    );
  }

  return (
    <>
      <HeaderWrapper ref={headerRef} sticky={isSticky} variant="white">
        <Logo py={3} mr={3} />
        <AnimatingMenuIcon
          toggle={showUserMenu}
          onClick={toggleMenu}
          ml="auto"
          width={40}
          height={40}
        />
        <UserLinksMenu
          mobile
          currentUser={currentUser}
          toggle={showUserMenu}
          width="100%"
          userLinks={userLinks}
        />
      </HeaderWrapper>
    </>
  );
};

const Header = styled(HeaderBase)``;

export default React.memo(withMedia(withCurrentUser(Header)));
