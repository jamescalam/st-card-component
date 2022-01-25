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
  state = { active: false };

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
    const ans_start = this.props.args["ans_start"]
    const ans_end = this.props.args["ans_end"]
    const ans_score = this.props.args["ans_score"]
    const score = this.props.args["score"]
    const url = this.props.args["url"]
    const key = this.props.args["key"]
    const expand = this.state.active

    // extract answer span
    const pre_answer = context.slice(0, ans_start)
    const answer = context.slice(ans_start, ans_end)
    const post_answer = context.slice(ans_end)

    // create the card
    return (
      <div style={{ padding: "1rem" }}>
          <Card variant="outlined">
            <CardHeader
              title={title}
              subheader={score}
            />
            <CardContent>
              <Typography variant="body2">
                {(expand) ? (pre_answer) : ("")}
                <span
                  style={{
                    fontWeight: expand ? "bold" : "normal",
                    color: expand ? "#f63366" : "#000000"
                  }}
                >
                  {answer}
                </span>
                {(expand) ? (post_answer) : ("")}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="open source url"
                href={url}
                target="_PARENT"
              >
                <LaunchIcon />
              </IconButton>
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