import React from "react";
import {RecommendItem,RecommendWrapper} from "../style"

class Recommend extends React.Component {
    render() {
        return (
            <RecommendWrapper>
            <RecommendItem imgUrl=""></RecommendItem>
            <RecommendItem></RecommendItem>
            <RecommendItem></RecommendItem>
            <RecommendItem></RecommendItem>
          </RecommendWrapper>
        )
    }
}


export default Recommend