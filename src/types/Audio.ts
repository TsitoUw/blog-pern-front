export type SongAttributes = {
  title:string,
  artist:string,
  artwork:string|null,
  filename:string
}

export type SongMassive = {
  id:string;
  artist:string;
  title:string;
  artwork:string;
  description:string|null;
  filename:string;
  ownerId:string;
  owner:{
    username:string;
    artistname:string;
  };
  _count:{
    comment:number;
    favoritedBy:number;
  }
}