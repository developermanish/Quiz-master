import React from "react";
import { Link, Redirect } from "react-router-dom";
import {setInStorage} from '../components/storage'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    handleLogout = () => {
        console.log("Button is clicked")
        setInStorage('token',null);
        setInStorage('id',null)
        setInStorage('email',null);
        setInStorage('userType',null);
        
    }
    render() {
        return(
            <div>
                <nav className="nav">
                    <div className="nav-logo">
                        Quiz-Master
                    </div>
                    
                    <div>
                        <div onClick={this.handleLogout}><Link to="/">Logout</Link></div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header;