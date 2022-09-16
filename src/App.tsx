import React from 'react';

import GameList from './containers/GameList';

import { filterPlatform, gamesLoad, ReduxGames } from './state/reducers/games';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './state';
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Box,
  Paper,
  Button,
} from '@mui/material';
import { IndexedObject } from './utils';
import { ReduxPlatforms } from './state/reducers/platforms';
import { FontAwesomeIcon } from './components';
import { Helmet } from 'react-helmet'

export const themeOptions: IndexedObject = {
  palette: {
    type: 'dark',
    primary: {
      main: '#01579b',
    },
    background: {
      // default: '#111111',
      // paper: '#212121',
      default: '#0f1015',
      paper: 'rgba(66,66,66,0.26)',
    },
    secondary: {
      main: '#00bcd4',
    },
    text: {
      primary: '#b1b9bc',
      secondary: 'rgba(204,211,213,0.87)',
      disabled: 'rgba(204,211,213,0.6)',
      hint: 'rgba(204,211,213,0.4)',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    htmlFontSize: 18,
    fontSize: 12,
    subtitle1: {
      fontSize: '0.8rem',
    },
    subtitle2: {
      fontSize: '0.6rem',
    },
    button: {
      fontWeight: 900,
    },
    overline: {
      fontSize: '0.5rem',
    },
    h1: {
      fontSize: '3.5rem',
    },
    h3: {
      fontSize: '2.2rem',
    },
    h4: {
      fontSize: '1.6rem',
    },
    h5: {
      fontSize: '1.4rem',
    },
    h6: {
      fontSize: '1.1rem',
    },
    caption: {
      fontSize: '0.5rem',
    },
  },
};
const theme = createTheme(themeOptions);
function App() {
  const { games, filter, loading, total } = useSelector(
    ReduxGames.filtered,
  ) as any;
  const allTotal = useSelector(ReduxGames.total);
  const platforms = useSelector(ReduxPlatforms.all);
  const dispatch = useDispatch<AppDispatch>();
  const toggleFilter = React.useCallback(
    (pid: any) => {
      dispatch(filterPlatform(pid));
    },
    [dispatch],
  );
  React.useEffect(() => {
    dispatch(gamesLoad());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Helmet title="Redux Filter Game Assessment"></Helmet>
      <Box
        component="main"
        sx={{
          background: theme.palette.background.default,
          height: '100vh',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Container style={{padding: theme.spacing(4, 1)}}>
          <Typography sx={ {textAlign:'center'} } variant="h3" component={'h3'} color={'text.primary'}>
            {loading ? 'Loading...' : 'Redux Filter Games Assessment.'}
          </Typography>
          <Box component={Paper} display="flex" elevation={3} mt={4}>
            <Box
              gap={2}
              display="grid"
              gridAutoFlow={'column'}
              gridAutoColumns="50px"
              p={1}
            >
              {platforms.map((item, key) => (
                <Button
                  variant="contained"
                  color={filter.includes(item.id) ? 'secondary' : 'primary'}
                  key={key}
                  title={item.title}
                  onClick={() => toggleFilter(item.id)}
                  sx={{
                    padding: '8px',
                    minWidth: 'unset',
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} group="fa-brands" />
                </Button>
              ))}
            </Box>
            <Box>
              {!loading && allTotal !== total && (
                <Typography
                  variant="h5"
                  component={'h5'}
                  color={'text.secondary'}
                >
                  {`Showing ${total} of ${allTotal}`}
                </Typography>
              )}
            </Box>
          </Box>

          {!loading && <GameList data={games} />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
