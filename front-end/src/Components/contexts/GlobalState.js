
import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { Post } from "../Post/Post";

const GlobalState = (props) => {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const togglePost = () => {
    setCreatePostOpen(!createPostOpen);
};

      useEffect(()=>{
    <Post/>
}, [createPostOpen])

    const context = {
    togglePost,
    createPostOpen
    };
    
    return (
    <GlobalContext.Provider value={context}>
    {props.children}
    </GlobalContext.Provider>
    )}

export default GlobalState;
    