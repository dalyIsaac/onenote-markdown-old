import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { AddressBarComponent } from './addressBar';
import UsersContainer from '../containers/users';
import './header.css';

export const HeaderComponent = (props) => (
    <div className='container'>
        <Image
            className='icon'
            src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/onenote_96x1.png'
            imageFit={ImageFit.contain}
            width={48}
            height={48}
        />
        { props.users.length > 0 && 
            <div className='addressBarContainer'>
                <AddressBarComponent/>
            </div>}
        <div className='usersContainer'>
            <UsersContainer/>
        </div>
    </div>
);
