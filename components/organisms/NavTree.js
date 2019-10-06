import { useState, useEffect } from 'react';

import { getMenu } from '../../api/landing';

const NavTree = ({ tree = [], type, children }) => {
  const [navTree, setNavTree] = useState(tree);

  useEffect(() => {
    const fetchLinks = async () => {
      const result = await getMenu(null, type);

      setNavTree(result);
    };

    if (!navTree) {
      fetchLinks();
    }
  }, []);

  return children(navTree);
};

export default NavTree;
