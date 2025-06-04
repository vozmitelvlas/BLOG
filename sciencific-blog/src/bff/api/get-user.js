import {transformUser} from "../transformers/index.js";

export const getUser = async (loginToFind) =>
    fetch(`http://localhost:3005/users/?login=${loginToFind}`).then(loadedUsers =>
        loadedUsers.json()
    ).then(([loadedUser]) =>
        loadedUser && transformUser(loadedUser)
    )
