export class Edition {
  timestamp: string = '';
  author: string = '';
  note: string = '';
}

export class Node {
  timeMarker: string = '';
  bpm?: number | '' = '';
  chord?: string | '' = '';
  lyric?: string | '' = '';
  label?: string | '' = '';
}

export class Song {
  id: string = '';
  editions: Edition[] = [new Edition()];
  artists: string = '';
  title: string = '';
  album?: string = '';
  albumYear?: number | '' = '';
  albumCoverLink?: string = '';
  songwriters?: string = '';
  producers?: string = '';
  publishers?: string = '';

  timeSignature: string = '';
  key: string = '';
  nodes: Node[] = [new Node()];
}
