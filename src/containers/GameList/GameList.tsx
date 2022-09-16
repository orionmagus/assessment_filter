import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import {FontAwesomeIcon, GameCard} from '@components';
import { IndexedObject } from '@app/utils';
import { Typography } from '@mui/material';
export interface Props  {
  data: IndexedObject[],
  children?: React.ReactNode;
}

export const GameList = ({data}:Props) => {
  return (
    <ImageList cols={3} rowHeight={120} gap={20}>
      <ImageListItem key="Subheader" cols={3} sx={{height:'auto !important'}}>
        <ListSubheader component="div">
          <Typography variant="h4" component={'h4'}>
            Games
          </Typography>
        </ListSubheader>
      </ImageListItem>
      {data.map((item, key) => (
        <GameCard key={key} {...item} />
      ))}
    </ImageList>
  );
}

export default GameList