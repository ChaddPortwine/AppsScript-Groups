/*
 * Returns a list of groups information
 * @returns {Array} - Array of JSON objects 
 */
function getGroupsData() {
    let groupsArray = getGroupsList()
    return reduceGroupsList(groupsArray)
}
/* 
 * Returns a list of groups
 *   with all of the fields
 *   from the api - AdminDirectory.Groups.list
 * {
 *   "kind": "admin#directory#group",
 *   "id": "0319y...",
 *   "etag": "\"gOh9Uq...\"",
 *   "email": "email@jahnelgroup.com",
 *   "name": "108 - EMAIL",
 *   "directMembersCount": "85",
 *   "description": "Description ",
 *   "adminCreated": true,
 *   "nonEditableAliases": [
 *     "email@jahnelgroup.com.test-google-a.com"
 *   ]
 * }
 * @returns {Array} - Array of JSON objects 
 */
function getGroupsList() {
    let pageToken;
    let page;
    let groupsArray = [];
    let domain = getProperty("domain")
    do {
        page = AdminDirectory.Groups.list({
            domain: domain,
            maxResults: 100,
            pageToken: pageToken
        });
        let groups = page.groups
        if (groups) {
            for (let i = 0; i < page.groups.length; i++) {
                groupsArray.push(groups[i])
                // console.log('%s (%s)', group.name, group.email, group.description);
                // console.log(group.name,); // group.email, group.description);
            }
        } else {
            console.log('No groups found.');
            return "No Groups Found"
        }
        let r = Object.keys(page.groups).map(k => {
            let value = page.groups[k];
        })
        pageToken = page.nextPageToken;
    } while (pageToken);
    return groupsArray
}
/*
 * Returns a list of groups information
 *   with the email aliases removed
 * {
 *   "kind": "admin#directory#group",
 *   "id": "0319y...",
 *   "etag": "\"gOh9Uq...\"",
 *   "email": "email@jahnelgroup.com",
 *   "name": "108 - EMAIL",
 *   "directMembersCount": "85",
 *   "description": "Description ",
 *   "adminCreated": true
 * }
 * @param {Object} JSON - list of key/value pairs
 * @returns {Array} - Array of JSON objects 
 */
function reduceGroupsList(groupsArray) {
    let reduced = groupsArray.reduce((acc, el) => {
        acc[el.id] = {
            "name": el.name,
            "email": el.email,
            "kind": el.kind,
            "id": el.id,
            "etag": el.etag,
            "email": el.email,
            "name": el.name,
            "directMembersCount": el.directMembersCount,
            "description": el.description,
            "adminCreated": el.adminCreated,
        }
        return acc
    }, {})
    return reduced
}