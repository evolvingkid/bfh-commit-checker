const base = require('./config/airtable');
const { commitReader } = require('./services/commitReader');

exports.sheetGithubMark = async () => {

    base('Day 1').select({
        maxRecords: 600,
        view: "Day1Updates"
    }).eachPage(async function page(records, fetchNextPage) {

        records.forEach(async function (record) {
     
            const recordID = record.id;

            let githubURL = record.get('GitHub URL');
            console.log(githubURL);

            if (githubURL) {
                
                let currentDate = new Date();
                currentDate = currentDate.getDate();
                let lastUpdateDate = record.get('lastUpdate');

                console.log(lastUpdateDate);

                if (currentDate !== lastUpdateDate) {

                    console.log(recordID);

                    let githubSplitData = githubURL.split('/');

                    const githubRepoName = githubSplitData[githubSplitData.length - 1].split('.')[0];
                    const githubUserName = githubSplitData[githubSplitData.length - 2];
    
                    let repoCommitsData = await commitReader(githubUserName, githubRepoName).catch(err => {
                        console.log(`error occured on comit Reader ${err}`);
                    });
    
                    if (repoCommitsData) {
    
                        let startingDate = new Date('2021-05-14');
                        let updateFeild = {lastUpdate : currentDate.toString()};
    
                        for (let index = 0; index < repoCommitsData.length; index++) {
    
                            let commitDate = new Date(repoCommitsData[index].date);
                            const diffTime = Math.abs(commitDate - startingDate);
                            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            let feildName = `Day${diffDays} Commits`;
    
                            updateFeild[feildName] = repoCommitsData[index].commit.toString();
                        }
    
                        let update = {
                            "id": recordID,
                            "fields": updateFeild
                        };
    
                        console.log(update);
    
                        await base('Day 1').update([update]).catch(err => {
    
                            console.log(`error occured on update airtable ${err}`);
                        });
    
                    }

                    
                }

            }

        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    })

}