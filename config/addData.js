import friendsData from '../utils/friendsData';
import { getDatabase, set, ref} from "firebase/database";
import database from "../config/firebase";

function loopData() {
    for (let i = 0; i < friendsData.length; i++) {
        writeFriendsData(friendsData[i].name, friendsData[i].username);
    }
}


function writeFriendsData(name, username) {
    set(ref(database, 'friends/' + username), {
        name: name,
    });
}

export default loopData;