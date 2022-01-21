import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { CardActions, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";

// these handle the expansion animation
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
};
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  margin: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class CardComponent extends StreamlitComponentBase<any> {
  state = { active: true };

  toggleActive = () => {
    console.log(this.state)
    const currentActive = this.state.active;
    this.setState({ active: !currentActive })
    console.log(this.state)
  };

  public render = (): ReactNode => {
    // pull in context ID, text, and score
    const cid = this.props.args["cid"]
    const context = this.props.args["context"]
    const score = this.props.args["score"]
    const key = this.props.args["key"]
    const expand = this.state.active

    // create the card
    return (
      <div style={{ padding: "1rem" }}>
        
          <Card variant="outlined">
            <CardHeader
              title={cid}
              subheader={score}
            />
            <CardContent>
              <Typography variant="body2">
                {context}
              </Typography>
            </CardContent>
            <Collapse 
              in={expand} 
              timeout="auto" 
              unmountOnExit
              addEndListener={() => Streamlit.setFrameHeight()}
              onEntered={() => Streamlit.setFrameHeight()}
              onExited={() => Streamlit.setFrameHeight()}>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                  aside for 10 minutes.
                </Typography>
              </CardContent>
            </Collapse>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expand}
                onClick={this.toggleActive}
                aria-expanded={expand}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            
          </Card>
        
      </div>
    )
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(CardComponent)