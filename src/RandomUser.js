import './RandomUser.css';
import Dob from './Dob';
import Gender from './Gender';
import Email from './Email';
import Nat from './Nat';

const RandomUser = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__image"><img src={userData.picture.large}/></div>
            <div className="card__title">{userData.name.first} {userData.name.last}</div>
            <div className="card__body">
                <Gender gender={userData.gender}/>
                <Email email={userData.email}/>
                <Dob dob={userData.dob}/>
                <Nat nat={userData.nat}/>
            </div>

        </div>
    )
};

export default RandomUser;