import React,{useRef,useEffect,useState} from "react";

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}

const contains = (str1,str2) => {
	for(let i=0;i<str1.length-str2.length+1;i++){		
		if(str1.substring(i,i+str2.length)==str2){
			return true;
		}
	}
	return false;
}

const showList = (name,list) => {
	let array = [];
	for(let i=0;i<list.devices.length;i++){
		if(contains(list.devices[i].name.toLowerCase(),name.toLowerCase())){
			array.push(list.devices[i].name);
		}
	}
	return array;
}


const SearchList = ({name,list,choose,chosen,show,setShow,inpRef,setShopname}) => {
	const refShow = useRef(null);
	useOnClickOutside(refShow,()=>setShow(false));

	return(
		<React.Fragment>
			{name.length!=0&&show&&
			<ul className="sList" ref={refShow}>
				{showList(name,list).map(element => {
					return(
						<li className="element" onClick={e=>{
							choose(element);
							chosen(true);
							setShow(false);
							setShopname(element);
							inpRef.current.value = element;
						}}>
							{element}
							<hr/>
						</li>
					)
				})}
			</ul>
			}
		</React.Fragment>
	)
}

export default SearchList;