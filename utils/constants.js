import { get, themeGet } from 'styled-system';

import theme from '../theme';

export const fromTheme = key => themeGet(key, get(theme, key));

export default { fromTheme };
