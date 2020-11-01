import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rootPaper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(4),
      height: theme.spacing(16),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const Events = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Layout>
         <div className="m-5">
        <Button variant="contained" color="primary">
          Create event
        </Button>
             </div> 
        <div className={classes.rootPaper}>
        <Link to='/event'>

      <Paper elevation={3}>
      <Typography variant="h6" className="p-3">CRUISEnVIBES</Typography>
      <Typography variant="body" className="p-3">Lets chill everyone</Typography>
      </Paper>
        </Link>
      <Paper elevation={3}>
      <Typography variant="h6" className="p-3">CRUISEnVIBES</Typography>
      </Paper>
      <Paper elevation={3}>
      <Typography variant="h6" className="p-3">CRUISEnVIBES</Typography>
      </Paper>
    </div>
      
      </Layout>
    </div>
  );
};

export default Events;
