import React,{useState,useRef} from "react";
import Slide from "./Slide.jsx";
import SearchList from "./SearchList.jsx";
import Cart from "./Cart.jsx";
import SearchResult from "./SearchResult.jsx";
import ShoppingList from "../ShoppingList.json";

const Content = () => {
	var [shopname,setShopname] = useState("");
	var [chosenItem,setChosenItem] = useState("");
	var [show,setShow] = useState(true);
	var [tobuy,setTobuy] = useState(false);
	var [tobuyList,setTobuyList] = useState([]);
	var [counts,setCounts] = useState([]);
	var [chosen,setChosen] = useState(false);
	var inpRef = useRef(null);
	var searchRef = useRef(null);
	var [bought,setBought] = useState([]);

	return(
		<React.Fragment>
			<div id="wrapper">
				<input className="form-control" id="productInput" placeholder="Search For Product" ref={inpRef}
				onChange={e=>{
					setShopname(e.target.value);
					setShow(true);
					setChosen(false);
					setChosenItem("");
					searchRef.current.style.backgroundColor = "rgb(0,123,255)";
				}}
				/>
				<button className="btn btn-primary" id="bouton" ref={searchRef}
				onClick={e=>{
					if(shopname.length==0)
						return;
					else if(ShoppingList[shopname[0].toUpperCase()+shopname.substring(1)]!=undefined){
						setChosenItem(shopname[0].toUpperCase()+shopname.substring(1));
						return;
					}	
					searchRef.current.style.backgroundColor = "red";
				}}
				>Search !</button>

				{chosenItem.length!=0&&
				<button className="btn btn-primary" id="return"
				onClick={e=>{
					if(tobuyList.length>0)
						setTobuy(true);
					setChosenItem("");
					setChosen(false);
				}}
				>Return</button>}
				
				<SearchList name={shopname} list={ShoppingList} choose={setChosenItem} chosen={setChosen} show={show} setShow={setShow} inpRef={inpRef} setShopname={setShopname}/>
				{chosen==false&&chosenItem.length==0&&
					<React.Fragment>
					<Slide name="Popular Categories" list={ShoppingList.devices} setChosenItem={setChosenItem} ShoppingList={ShoppingList}/>
					<Slide name="Recently Added" list={ShoppingList.RecentlyAdded} setChosenItem={setChosenItem} ShoppingList={ShoppingList}/>
					{bought.length!=0&&
						<Slide name="Your Cart" list={bought} setChosenItem={setChosenItem} ShoppingList={ShoppingList}/>
					}
					</React.Fragment>
				}
				
				{chosenItem.length!=0&&
				<SearchResult result={ShoppingList[chosenItem]} setTobuy={setTobuy} tobuyList={tobuyList} setTobuyList={setTobuyList}
				counts={counts} setCounts={setCounts}/>}
				{tobuy&&
				<Cart setTobuy={setTobuy} tobuyList={tobuyList} setTobuyList={setTobuyList}
				counts={counts} setCounts={setCounts} bought={bought} setBought={setBought} setChosen={setChosen} setChosenItem={setChosenItem}/>}
			</div>
			
		</React.Fragment>
	)

}

export default Content;