import React from 'react';
import MyPackage from '../../components/MyPackage/MyPackage'
import './AccountPage.css';


function AccountPage(props) {
    return (
        <div className="AccountPage-container">
            <h1 className="AccountPage-header">{`${props.user.name.charAt(0).toUpperCase()}${props.user.name.slice(1)}'s`} Account</h1>
            <div className="AccountPage-packages">
                {props.packages.length ? props.packages.map(myPackage => 
                    <MyPackage 
                        key={myPackage._id}
                        myPackage={myPackage}
                        handleDeletePackage={props.handleDeletePackage}
                    />
                )
                :
                <p>Go ahead...add a package</p>
                }
            </div>
        </div>
    )
}

export default AccountPage;

