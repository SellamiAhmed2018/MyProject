import React,{useState} from "react";
import {extractPrice} from "./Cart.jsx";

const contains = (element,list) => {
	for(let i=0;i<list.length;i++){
		if(list[i].name==element.name&&list[i].price==element.price&&list[i].img==element.img){
			return true;
		}
	}
	return false;
}

const containsCounts = (element,list) => {
	for(let i=0;i<list.length;i++){
		if(list[i].name==element.name){
			return true;
		}
	}
	return false;
}


const SearchResult = ({result,setTobuy,tobuyList,setTobuyList,counts,setCounts}) => {
	var temporary = [...result];
	const [lowPrice,setLowPrice] = useState("");
	const [highPrice,setHighPrice] = useState("");
	const [myresult,setMyresult] = useState([...result]);

	return(
		<React.Fragment>
			{result!=undefined&&
			<React.Fragment>
			<div className="divFilter">
				<h3 className="filter">Price : </h3>
				<input className="form-control" style={{width:100,display:"inline-block",fontFamily: "Arial",fontSize: 20}}
				onChange={e=>{
					setLowPrice(e.target.value);
					setMyresult(myresult => [...temporary]);
				}}/>
				<h3 className="filter"> to </h3>
				<input className="form-control" style={{width:100,display:"inline-block",fontFamily: "Arial",fontSize: 20}}
				onChange={e=>{
					setHighPrice(e.target.value);
					setMyresult(myresult => [...temporary]);
				}}/>
				<button className="btn btn-secondary" style={{
					backgroundColor: "purple",
					marginBottom: 10,
					marginLeft: 20,
					textAlign: "center",
					fontSize: 20,
					fontFamily: "Arial"
				}}
				onClick={e=>{
					if(lowPrice>highPrice){
						let temp = lowPrice;
						setLowPrice(highPrice);
						setHighPrice(temp);
					}
					setMyresult(myresult=> myresult.filter(element => parseInt(lowPrice)<=extractPrice(element.price)&&parseInt(highPrice)>=extractPrice(element.price)));
				}}
				>Filter</button>
			</div>
			<ul className="productList">
			{myresult.map(element => {return(
				<li className="productItem">
					<h2>{element.name}</h2>
					<br />
					<h2 className="productPrice">{element.price}</h2>
					<button className="btn btn-primary" style={{
						position: "relative",
						left: "40%",
						top: "40px",
						width: "200px",
						height: "50px",
						fontSize: 25,
						fontFamily: "Arial",
						fontWeight: "bolder"
					}}
					onClick={e=>{
						if(!contains(element,tobuyList)){
							setTobuyList(tobuyList => [...tobuyList,element]);
						}
						if(!containsCounts(element,counts)){
							setCounts(counts => [...counts,{name:element.name,price:element.price,count:1}]);
						}
						setTobuy(true);
					}}
					>Add To Cart</button>
					<br />
					<img alt="" src={element.img} className="productImg"/>
					<br />
				</li>
				)})}
			</ul>
			</React.Fragment>
			}
		</React.Fragment>	
	);
}

export default SearchResult;