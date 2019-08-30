import { useState, useEffect } from 'react';

import { getNav } from '../../api/landing';

const NavTree = ({ tree = [], type, children }) => {
  const [navTree, setNavTree] = useState(tree);

  useEffect(() => {
    const fetchLinks = async () => {
      const result = await getNav(null, type);

      setNavTree(result);
    };

    if (!navTree.length) {
      fetchLinks();
    }
  }, []);

  return children(navTree);
};

export default NavTree;
