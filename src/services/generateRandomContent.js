import {faker} from "@faker-js/faker";

function generateDummyVideoPosts(firstIndex = 0, count = 10) {
  const videoPosts = [];

  for (let i = 0; i < count; i++) {
    const id = Math.random();
    const position = firstIndex + i;
    const randomVideoIndex = 1 + Math.floor(Math.random() * 9);
    const uri = `https://d37hcy55dsnar2.cloudfront.net/moments/${randomVideoIndex}.mp4`;
    const thumbnail = `https://d37hcy55dsnar2.cloudfront.net/moments/thumbnail_${randomVideoIndex}.png`;

    const channel = {
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 71)}`,
      name: `${firstIndex + i}${faker.name.firstName()}`,
    };

    const commentCount = Math.floor(Math.random() * 101);
    const likeCount = Math.floor(Math.random() * 8001);
    const description = faker.lorem.paragraph(20);

    const uploader = {
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 71)}`,
      name: faker.name.fullName(),
    };

    videoPosts.push({
      id,
      position,
      uri,
      thumbnail,
      channel,
      commentCount,
      likeCount,
      description,
      uploader,
    });
  }

  return videoPosts;
}

function generateRandomMusic(count = 10) {
  const musicList = [];

  for (let i = 0; i < count; i++) {
    const id = `${Math.random()}`;
    const randomMusicIndex = 1 + Math.floor(Math.random() * 26);
    const uri = `https://d37hcy55dsnar2.cloudfront.net/background-music/${randomMusicIndex}.mp3`;
    const name = faker.music.songName();
    const details = faker.music.genre();

    musicList.push({
      id,
      uri,
      name,
      details,
    });
  }

  return musicList;
}

function lorem(length = 20) {
  return faker.lorem.paragraph(length);
}

export { generateDummyVideoPosts, lorem, generateRandomMusic };
