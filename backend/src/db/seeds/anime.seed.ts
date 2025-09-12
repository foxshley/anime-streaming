import { db } from "../index";
import { anime } from "../schema/content";

export async function seedAnime() {
	await db.insert(anime).values([
		{
			title: "Neon Genesis Evangelion",
			originalTitle: "新世紀エヴァンゲリオン",
			status: "completed",
			totalEpisodes: 26,
			release_year: 1995,
		},
		{
			title: "Cowboy Bebop",
			originalTitle: "カウボーイビバップ",
			status: "completed",
			totalEpisodes: 26,
			release_year: 1998,
		},
		{
			title: "Attack on Titan",
			originalTitle: "進撃の巨人",
			status: "completed",
			totalEpisodes: 25,
			release_year: 2013,
		},
		{
			title: "My Hero Academia",
			originalTitle: "僕のヒーローアカデミア",
			status: "completed",
			totalEpisodes: 13,
			release_year: 2016,
		},
		{
			title: "Demon Slayer: Kimetsu no Yaiba",
			originalTitle: "鬼滅の刃",
			status: "completed",
			totalEpisodes: 12,
			release_year: 2019,
		},
		{
			title: "Fullmetal Alchemist: Brotherhood",
			originalTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST",
			status: "completed",
			totalEpisodes: 64,
			release_year: 2009,
		},
		{
			title: "Guilty Crown",
			originalTitle: "ギルティクラウン",
			status: "completed",
			totalEpisodes: 12,
			release_year: 2011,
		},
		{
			title: "Fate/Stay night",
			originalTitle: "フェイト/ステイナイト",
			status: "completed",
			totalEpisodes: 12,
			release_year: 2006,
		},
		{
			title: "Tokyo Ghoul",
			originalTitle: "東京喰種トーキョーグール",
			status: "completed",
			totalEpisodes: 12,
			release_year: 2014,
		},
		{
			title: "One Punch Man",
			originalTitle: "ワンパンマン",
			status: "completed",
			totalEpisodes: 12,
			release_year: 2015,
		},
	]);
}
