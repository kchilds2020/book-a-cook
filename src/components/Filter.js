import React, {useState} from 'react'
import '../styles/Filter.css'
import onClickOutside from "react-onclickoutside";

function Filter() {
    const [priceDropdown, setPriceDropDown] = useState(false);
    const [CSDropdown, setCSDropDown] = useState(false);
    const [distanceDropdown, setDistanceDropDown] = useState(false);

    const toggleCSDropdown = () => { 
        CSDropdown === true ? setCSDropDown(false) : setCSDropDown(true);
        
    }
    const togglePriceDropdown = () => {
        priceDropdown === true ? setPriceDropDown(false) : setPriceDropDown(true);
    }
    const toggleDistanceDropDown = () => {
        distanceDropdown === true ? setDistanceDropDown(false) : setDistanceDropDown(true);
    }

    Filter.handleClickOutside = () =>{
        setDistanceDropDown(false);
        setCSDropDown(false);
        setPriceDropDown(false);
    }

    return (
            <div className = "profileFilter">
                    <span className = "filterTitle">Cooks Near You</span>
                <div className = "dropdownContainer">
                    <div className="DropDown">
                    <button className = "distanceDropDown" onClick = {toggleDistanceDropDown}>Distance</button>
                            <div id="myDropdown" className={`dropdown-content ${distanceDropdown === true ? 'show' : 'hide'}`}  >
                                    <a href="https://google.com">No Limit</a>
                                    <a href="https://google.com">less than 20 miles</a>
                                    <a href="https://google.com">less than 50 miles</a>
                                    <a href="https://google.com">less than 100 miles</a>
                                    <a href="https://google.com">less than 200 miles</a>
                            </div>
                    </div>
                        <div className="DropDown">
                            <button className = "cookingStyleDropDown" onClick={toggleCSDropdown}>Cooking Style</button>
                            <div id="myDropdown" className={`dropdown-content ${CSDropdown === true ? 'show' : 'hide'}`}  >
                                    <a href="https://google.com">Oriental</a>
                                    <a href="https://google.com">American</a>
                                    <a href="https://google.com">Italian</a>
                                    <a href="https://google.com">Mexican</a>
                                    <a href="https://google.com">Thai</a>
                                </div>  
                        </div>
                            <div className="DropDown">
                                <button className = "priceDropDown" onClick={togglePriceDropdown}>Price </button>
                                <div id="myDropdown" className={`dropdown-content ${priceDropdown === true ? 'show' : 'hide'}`}  >
                                        <label>Less Than $</label>
                                        <input type="text" defaultValue = "200" className = "priceInput"/>
                                        {/* <a href="https://google.com">less than 100</a>
                                        <a href="https://google.com">less than 250</a>
                                        <a href="https://google.com">less than 500</a>
                                        <a href="https://google.com">less than 1000</a> */}
                                </div>
                            </div>
                    </div>
                </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Filter.handleClickOutside
  };

export default onClickOutside(Filter, clickOutsideConfig);
