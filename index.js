import fs from 'fs';

let config = {
    dir: 'my custom path here'
};

if (fs.existsSync('config.json')) config = JSON.parse(fs.readFileSync('config.json'));

const customSongDir = config.dir;

async function checkCustomSongs(songsDir){
    if (fs.existsSync('customSongsReport.json')) fs.unlinkSync('customSongsReport.json');

    const songsReport = {};
    const modDependencies = new Set();
    const difficultiesCounts = {};
    let totalSongs = 0;

    const songs = await fs.promises.readdir( songsDir );

    // loop over songs dir
    for( const song of songs ) {
        console.log(`current song: ${song}`);
        totalSongs += 1;
        
        if (fs.existsSync(`${songsDir}/${song}/info.dat`)) {
            const infoFile = fs.readFileSync(`${songsDir}/${song}/info.dat`);
            if (infoFile) {
                try {
                    const json = JSON.parse(infoFile);
                    const songDeps = new Set();
                    const songDifficulties = new Set();
    
                    json?._difficultyBeatmapSets?.forEach((difficultyBeatmapSet) => {
                        difficultyBeatmapSet?._difficultyBeatmaps?.forEach((difficulty) => {
                            const currentDeps =  difficulty?._customData?._requirements || [];
                            songDeps.add(...currentDeps);
                            const mapSetDifficulty = difficulty._difficulty
                            songDifficulties.add(mapSetDifficulty);
                            if (difficultiesCounts[mapSetDifficulty]) difficultiesCounts[mapSetDifficulty] += 1;
                            else difficultiesCounts[mapSetDifficulty] = 1
                        })
    
                    }); 
                    
                    songsReport[song] = {
                        songName: json._songName,
                        songArtist: json._songAuthorName,
                        songDir: `${songsDir}/${song}`,
                        songDeps: Array.from(songDeps),
                        songDifficulties: Array.from(songDifficulties)
                    }

                    if (songDeps.size > 0) modDependencies.add(...Array.from(songDeps));
                } catch(e) {
                    console.log(`error for ${songsDir}/${song}/info.dat: ${e}`);
                }
            }

        }

    }

    const report = {
        reportLastRan: new Date(),
        songsReport,
        modDependenciesList: Array.from(modDependencies).filter(a => !!a && a),
        difficultiesCounts,
        totalSongs
    }


    fs.writeFileSync('customSongsReport.json', JSON.stringify(report, null, 2), err => {
        if (err) {
          console.error(err);
        } else {
          console.log('wrote report to file')
        }
      });

    return report
}

await checkCustomSongs(customSongDir);

