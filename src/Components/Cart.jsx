import React,{useEffect,useState,useReducer,useCallback} from "react";


const getCount = (list,element) => {
	for(let i=0;i<list.length;i++){
		if(list[i].name==element.name){
			return list[i].count;
		}
	}
	return 0;
}

const getIndex = (list,element) => {
	for(let i=0;i<list.length;i++){
		if(list[i].name==element.name){
			return i;
		}
	}
	return null;
}

export const removeSpaces = (text) => {
	let newText = "";
	for(let i=0;i<text.length;i++){
		if(text[i]==' '){
			continue;
		}
		newText+= text[i];
	}
	return newText;
}

export const extractPrice = (price) => {
	let finalPrice = "";
	for(let i=0;i<price.length;i++){
		if(price[i]==' '||price[i]=='€'||price[i]=='$'){
			continue;
		}
		if(price[i]==','){
			finalPrice+='.';
			continue;
		}
		finalPrice+=price[i];
	}
	return finalPrice;
}

const inList = (element,list) => {
	for(let i=0;i<list.length;i++){
		if(list[i]==element)
			return true;
	}
	return false;
}

const united = (list1,list2) => {
	let finalList = [...list1];
	for(let i=0;i<list2.length;i++){
		if(inList(list2[i],finalList)){
			continue;
		}
		finalList.push(list2[i]);
	}
	return finalList;
}

const sum = (list) => {
	let somme = 0;
	for(let i=0;i<list.length;i++){
		somme+= parseFloat(extractPrice(list[i].price))*parseFloat(list[i].count);
	}
	somme = somme.toString();
	return somme;
}

const Cart = ({setTobuy,tobuyList,setTobuyList,counts,setCounts,bought,setBought,setChosen,setChosenItem}) => {

	return(
		<div id="theCart">
			<button className="btn btn-secondary" style={{
				backgroundColor:"red",
				fontFamily:"Arial",
				fontSize: 18,
				position: "relative",
				left: "90%"
			}}
			onClick={e=>{
				setTobuy(false);
			}}
			>X</button>
			<ul className="cartList">
				{tobuyList.map(element => {return(
					<li className="cartItem">
						<h5>{element.name}</h5>
						<h5 className="cartPrice">{`${parseInt(removeSpaces(element.price))*getCount(counts,element)},${element.price.substring(element.price.length-4)}`}</h5>
						<button className="btn btn-primary"
						style={{
							position:"relative",
							left: "70%",
							bottom: 20,
							fontSize:20,
							fontFamily:"Arial",
							textAlign: "center",
							backgroundColor: "rgb(100,0,150)"
						}}
						onClick={e=>{
							tobuyList.splice(tobuyList.indexOf(element),1);
							setTobuyList(tobuyList => [...tobuyList]);
							counts.splice(getIndex(counts,element),1);
							setCounts(counts => [...counts]);
						}}
						>x</button>

						<button className="btn btn-primary"
						style={{
							position:"relative",
							left: 30,
							bottom: 10,
							fontSize:20,
							fontFamily:"Arial",
							textAlign: "center",
							backgroundColor: "yellow",
							color: "#000"
						}}
						onClick={e => {
							let newCount;
							for(let i=0;i<counts.length;i++){
								if(counts[i].name==element.name){
									newCount = counts[i].count+=1;
									counts.splice(i,1);
								}
							}
							setCounts(counts => [...counts,{name:element.name,price:element.price,count:newCount}]);
						}}
						>&#8593;</button>

						<h5 className="counter">{getCount(counts,element)}</h5>

						<button className="btn btn-primary"
						style={{
							position:"relative",
							left: 50,
							bottom: 10,
							fontSize:20,
							fontFamily:"Arial",
							textAlign: "center",
							backgroundColor: "yellow",
							color: "#000"
						}}
						onClick={e=>{
							let newCount;
							for(let i=0;i<counts.length;i++){
								if(counts[i].name==element.name){
									if(counts[i].count==1){
										return;
									}
									newCount = counts[i].count-=1;
									counts.splice(i,1);
								}
							}
							setCounts(counts => [...counts,{name:element.name,price:element.price,count:newCount}]);
						}}
						>&#8595;</button>

						<img src={element.img} className="cartImg"/>						
					</li>
				)})}
			</ul>
			{tobuyList.length>0&&
				<React.Fragment>
					<hr />
					<h1 className="total">Total : {sum(counts)} €</h1>
					<button className="btn btn-primary" style={{
						backgroundColor: "#2fcc8b",
						position: "relative",
						left: "36%",
						marginTop: 30,
						fontSize: 23,
						fontFamily: "Arial",
						width: 100,
						height: 50,
						textAlign: "center"
					}}
					onClick={e=> {
						setTobuy(false);
						setBought(bought => united(bought,tobuyList));
						setTobuyList(tobuyList => []);
						setChosenItem(chosenItem => "");
						setChosen(chosen => false);
					}}
					>Submit</button>
				</React.Fragment>
			}
		</div>
	);

}

export default Cart;