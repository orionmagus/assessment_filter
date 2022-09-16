import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import * as React from "react";
import { render } from "react-dom";
import FontAwesomeIcon from "./FontAwesomeIcon";

export interface Props {
  children?: React.ReactNode,
  [key:string]: any
}

export const GameCard = (props:Props) =>{
    return (
      <ImageListItem sx={{overflow:'hidden'}}>
        <img
          src={props.img}
        
          alt={props.title}
          loading="lazy"
        />
        {}
        <ImageListItemBar
          title={props.title}
          subtitle={props.release_date}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${props.title}`}
            >
              <FontAwesomeIcon icon="info" />
            </IconButton>
          }
        />
      </ImageListItem>
    );
  }
