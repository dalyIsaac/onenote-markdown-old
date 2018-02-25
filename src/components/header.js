import * as React from 'react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { AddressBarComponent } from './addressBar';
import UsersContainer from '../containers/users';
import './header.css';

class HeaderComponent extends React.Component {
    render() {
        return (
            <div className='container'>
                <Image
                    className='icon'
                    src='https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/png/onenote_48x1.png'
                    imageFit={ImageFit.center}
                    width={48}
                    height={48}
                />
                <div className='addressBarContainer'>
                    <AddressBarComponent/>
                </div>
                <div className='usersContainer'>
                    <UsersContainer/>
                </div>
            </div>
          );
    }
}



export default HeaderComponent;
