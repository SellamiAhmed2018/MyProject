import React from "react";
import {removeSpaces} from "./Cart.jsx";


const Slide = ({name,list,setChosenItem,ShoppingList}) => {
	return(
		<div className="Slider">
			<h1 style={{marginLeft:30,marginBottom:30}}>{name}</h1>
			<ul className="listUl">
				{list.map(element => {
					return(
						<li className="elementList">
							<img alt="" src={element.img} className="deviceImg"
							onClick={e=>{
								if(name=="Your Cart")
									return;
								if(ShoppingList[element.name]==undefined){
									setChosenItem(removeSpaces(name));
									return;
								}
								setChosenItem(element.name);
							}}/>
							<h3 className="deviceName">{element.name}</h3>
						</li>
					)
				})}
			</ul>
		</div>
	);
}

export default Slide;