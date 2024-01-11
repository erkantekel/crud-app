import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth, DeleteWithAuth } from "../../services/HttpService";

const useStyles = makeStyles((theme) => ({
    root: {
      width: 800,
      textAlign : "left",
      margin : 20
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
  }));

function Post(props) {
   const {title, text, userId, userName, postId} = props;
   const classes = useStyles();
   const [expanded, setExpanded] = useState(false);
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [commentList, setCommentList] = useState([]);
   const isInitialMount = useRef(true);
   const [refresh, setRefresh] = useState(false);
   let disabled = localStorage.getItem("currentUser") == null ? true:false;
   
   const setCommentRefresh = () => {
     setRefresh(true);
   }
   const handleExpandClick = () => {
     setExpanded(!expanded);
     refreshComments();
     console.log(commentList);
   };
   
   const refreshComments = () => {
    fetch("http://localhost:8080/comment?postId="+postId)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setCommentList(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )

    setRefresh(false)
  }

  useEffect(() => {
    if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [refresh])

  useEffect(() => {},[])

   return(
           <Card className={classes.root}>
                <CardHeader
                    avatar={
                    <Link  className={classes.link} to={{pathname : '/users/' + userId}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <CommentIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className = {classes.container}>
                    {error? "error" :
                    isLoaded? commentList.map(comment => (
                      <Comment userId = {comment.userId} userName = {comment.userName} text = {comment.text}></Comment>
                    )) : "Loading"}
                    {disabled? "":
                    <CommentForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} postId = {postId} setCommentRefresh={setCommentRefresh}></CommentForm>}
                    </Container>
                </Collapse>
                </Card>
   )
}

export default Post;