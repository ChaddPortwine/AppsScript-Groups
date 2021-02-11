function getGroupsData() {
    // groupsData = GroupsApp.getGroupByEmail("administrators@jahnelgroup.com");
    // return groupsData;

    let pageToken;
    let page;
    let groupsArray = [];
    let domain = '' // TODO Set with Properties 
    do {
        page = AdminDirectory.Groups.list({
            domain: 'jahnelgroup.com',
            maxResults: 100,
            pageToken: pageToken
        });
        let groups = page.groups;
        if (groups) {
            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];
                groupsArray = [groupsArray, ...groups];
                // Logger.log('%s (%s)', group.name, group.email, group.description);
                Logger.log(group.name,); // group.email, group.description);
            }
        } else {
            Logger.log('No groups found.');
        }
        let reduced = Object.keys(page.groups).map(k => {
            let value = page.groups[k];
        })
        pageToken = page.nextPageToken;
    } while (pageToken);
    // console.log("groups: ", groupsArray);
    return groupsArray
}
