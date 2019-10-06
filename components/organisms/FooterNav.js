import React, { useState } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Flex, Box, Text } from 'rebass';
import NavTree from './NavTree';
import { Container, Link } from '../base';
import { ExpandMore, ExpandLess, HeartIcon, InstagramIcon, VkIcon, FbIcon } from '../molecules';

const CategoryLink = styled(Link)`
  font-weight: 500;
`;

const MenuLink = styled(Link)`
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes[0]}px;
`;

const ExpandLink = styled(Box)`
  position: relative;
  padding-right: 16px;

  ${ExpandMore} {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

const ExpandCategoryBase = ({ className, menuItem, ...props }) => {
  const [isExpanded, setExpanded] = useState(false);

  let menuLinks = [];

  if (menuItem.below && menuItem.below.length > 0) {
    menuLinks = menuItem.below.map(subMenu => (
      <Box as="li">
        <MenuLink variant="whiteBlack" key={subMenu.id} href={subMenu.relative}>
          {subMenu.title}
        </MenuLink>
      </Box>
    ));
  }

  return (
    <Box as="li" className={className} {...props}>
      <ExpandLink mb={2}>
        <MenuLink variant="whiteBlack" title={menuItem.title} href={menuItem.relative}>
          {menuItem.title}
        </MenuLink>
        {menuLinks.length > 0 && !isExpanded && (
          <ExpandMore
            fill="white"
            css={{ verticalAlign: 'middle' }}
            onClick={() => {
              setExpanded(true);
            }}
          />
        )}
        {menuLinks.length > 0 && isExpanded && (
          <ExpandLess
            fill="white"
            css={{ verticalAlign: 'middle' }}
            onClick={() => {
              setExpanded(false);
            }}
          />
        )}
      </ExpandLink>

      <CSSTransitionGroup
        component={FirstChild}
        transitionName="expand-category"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {isExpanded && <Box as="ul">{menuLinks}</Box>}
      </CSSTransitionGroup>
    </Box>
  );
};

const ExpandCategory = styled(ExpandCategoryBase)`
  .expand-category-enter {
    opacity: 0.01;
  }

  .expand-category-enter.expand-category-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .expand-category-leave {
    opacity: 1;
  }

  .expand-category-leave.expand-category-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

const BottomLinks = styled(Text)`
  padding: 0;
  margin: 0;
  list-style: none;

  ${Box} {
    display: inline-block;
    padding: ${themeGet('space.1')}px;
  }
`;

const SocialLinks = styled(BottomLinks)`
  ${Link} {
    display: inline-block;
    border: solid 1px rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
`;

const FooterNavBase = ({ className, tree, ...props }) => {
  const [fullList, setFullList] = useState(false);

  const visibleLinks = 6;

  return (
    <>
      <NavTree tree={tree} type="footer">
        {navTree => {
          return (
            <Flex className={className} justifyContent="space-between" flexWrap="wrap">
              {navTree &&
                navTree.data &&
                navTree.data.map(category => {
                  return (
                    <Box key={category.key} px={3} width={['50%', '33.3%', '16.6%']} mb={3}>
                      <CategoryLink
                        variant="blackWhite"
                        title={category.title}
                        href={category.relative}
                        mb={4}
                      >
                        {category.title}
                      </CategoryLink>

                      <Box as="ul">
                        {category.below &&
                          category.below.map((menuItem, i) => {
                            if (fullList || i < visibleLinks) {
                              return <ExpandCategory key={menuItem.key} menuItem={menuItem} />;
                            }

                            return null;
                          })}
                      </Box>
                      {!fullList && (
                        <Text
                          as="span"
                          color="white"
                          fontSize={0}
                          fontWeight="bold"
                          css={{ cursor: 'pointer' }}
                          onClick={() => setFullList(true)}
                        >
                          Еще...
                        </Text>
                      )}
                    </Box>
                  );
                })}
            </Flex>
          );
        }}
      </NavTree>
      <Box
        py={3}
        css={{
          borderTop: 'solid 1px rgba(255,255,255,.3)',
          borderBottom: 'solid 1px rgba(255,255,255,.3)',
        }}
      >
        <Container>
          <BottomLinks as="ul" fontSize={0} textAlign="center">
            <Box as="li">
              <Link variant="whiteBlack" href="/about">
                О&nbsp;компании
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/offers">
                Готовые&nbsp;предложения
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/offers?discount=1">
                Скидки&nbsp;и&nbsp;акции
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/bonus">
                Бонусная&nbsp;программа
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/referral">
                Реферальная&nbsp;программа
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/partner">
                Партнерам
              </Link>
            </Box>
            <Box as="li">
              <Link
                variant="whiteBlack"
                href="/orders"
                title="Поиск заявок на кейтеринговые услуги"
              >
                Поиск&nbsp;заявок
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/company" title="Рейтинг партнеров">
                Рейтинг&nbsp;партнеров
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/feedback">
                Отзывы
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/contacts">
                Контакты
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/articles">
                Блог
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/legal">
                Условия
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/privacy" title="Политика конфиденциальности">
                Политика
              </Link>
            </Box>
            <Box as="li">
              <Link variant="whiteBlack" href="/sitemap" title="Политика конфиденциальности">
                Карта&nbsp;сайта
              </Link>
            </Box>
          </BottomLinks>
        </Container>
      </Box>
      <Container py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="white" fontSize={1}>
            Сделано с <HeartIcon css={{ verticalAlign: 'text-bottom' }} /> © 2016-2019 CaterMe
          </Text>
          <Box as="nav" role="navigation" aria-labelledby="social-links">
            <SocialLinks as="ul">
              <Box as="li">
                <Link
                  href="https://www.facebook.com/caterme.ru"
                  title="Наша группа в сети Facebook. Присоединяйтесь!"
                  icon="fb"
                >
                  <FbIcon color="white" width={20} height={20} />
                </Link>
              </Box>

              <Box as="li">
                <Link
                  href="https://www.instagram.com/caterme.ru/"
                  title="Наша группа в Инстаграм. Присоединяйтесь!"
                  icon="instagram"
                >
                  <InstagramIcon color="white" width={20} height={20} />
                </Link>
              </Box>

              <Box as="li">
                <Link
                  href="https://vk.com/caterme"
                  title="Наша группа в Вконтакте. Присоединяйтесь!"
                  icon="vk"
                >
                  <VkIcon color="white" width={20} height={20} />
                </Link>
              </Box>
            </SocialLinks>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

const FooterNav = styled(FooterNavBase)`
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  li > ul {
    margin-left: ${props => props.theme.space[2]}px;
  }
`;

export default React.memo(FooterNav);
