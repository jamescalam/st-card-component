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
import LaunchIcon from '@mui/icons-material/Launch';
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
  marginLeft: 'auto',
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
    const title = this.props.args["title"]
    const context = this.props.args["context"]
    const highlight_start = this.props.args["highlight_start"]
    const highlight_end = this.props.args["highlight_end"]
    const score = this.props.args["score"]
    const url = this.props.args["url"]
    const key = this.props.args["key"]
    const expand = this.state.active

    // extract highlight span
    const pre_highlight = context.slice(0, highlight_start)
    const highlight = context.slice(highlight_start, highlight_end)
    const post_highlight = context.slice(highlight_end)

    // create the card
    return (
      <div style={{
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        whiteSpace: "pre-wrap"
        }}
      >
          <Card variant="outlined">
            <CardHeader
              title={title}
              subheader={score}
            />
            <CardContent>
              <Typography variant="body2">
                {(expand) ? (pre_highlight) : ("")}
                <span
                  style={{
                    fontWeight: expand ? "bold" : "normal"
                  }}
                >
                  {highlight}
                </span>
                {(expand) ? (post_highlight) : ("")}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                disabled={this.props.disabled}
                aria-label="open source url"
                href={url}
                target="_PARENT"
              >
                <LaunchIcon />
              </IconButton>
              <ExpandMore
                expand={expand}
                onClick={this.toggleActive}
                disabled={this.props.disabled}
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