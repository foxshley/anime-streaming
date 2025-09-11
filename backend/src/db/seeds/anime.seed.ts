import { db } from "../index";
import { anime } from "../schema/content";


export async function seedAnime() {
  await db.insert(anime).values([
    { animeId: 1, title: "Neon Genesis Evangelion", originalTitle: "新世紀エヴァンゲリオン", status: "completed", totalEpisodes: 26, release_year: 1995 },
    { animeId: 2, title: "Cowboy Bebop", originalTitle: "カウボーイビバップ", status: "completed", totalEpisodes: 26, release_year: 1998 },
    { animeId: 3, title: "Attack on Titan", originalTitle: "進撃の巨人", status: "completed", totalEpisodes: 25, release_year: 2013 },
    { animeId: 4, title: "My Hero Academia", originalTitle: "僕のヒーローアカデミア", status: "completed", totalEpisodes: 13, release_year: 2016 },
    { animeId: 5, title: "Demon Slayer: Kimetsu no Yaiba", originalTitle: "鬼滅の刃", status: "completed", totalEpisodes: 12, release_year: 2019 },
    { animeId: 6, title: "Fullmetal Alchemist: Brotherhood", originalTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST", status: "completed", totalEpisodes: 64, release_year: 2009 },
    { animeId: 7, title: "Guilty Crown", originalTitle: "ギルティクラウン", status: "completed", totalEpisodes: 12, release_year: 2011 },
    { animeId: 8, title: "Fate/Stay night", originalTitle: "フェイト/ステイナイト", status: "completed", totalEpisodes: 12, release_year: 2006 },
    { animeId: 9, title: "Tokyo Ghoul", originalTitle: "東京喰種トーキョーグール", status: "completed", totalEpisodes: 12, release_year: 2014 },
    { animeId: 10, title: "One Punch Man", originalTitle: "ワンパンマン", status: "completed", totalEpisodes: 12, release_year: 2015 },
  ]);
}