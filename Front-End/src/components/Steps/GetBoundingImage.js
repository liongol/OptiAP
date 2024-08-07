import {useEffect, forwardRef} from "react";

const GetBoundingImage=(props)=>
{
    const imageElement= document.getElementById(props.idImg);
    let imgBounding=[];
    if (imageElement)
    {
        const rect = imageElement.getBoundingClientRect();
        imgBounding = {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
        };
    }

    props.setArrayBounding(imgBounding);

    return;
}
export default GetBoundingImage;