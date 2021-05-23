class Edition {
  timestamp: string = '';
  author: string = 'Michal';
  note: string = '';
}

class Node {
  timeMarker: string = '';
  bpm?: number | '' = '';
  chord?: string | '' = '';
  lyric?: string | '' = '';
  label?: string | '' = '';
}

export class Song {
  id: string = '';
  // editions: Edition[] = [new Edition()];
  artists: string = 'new artist';
  title: string = 'new title';
  album?: string = '';
  albumYear?: number | '' = '';
  albumCoverLink?: string = '';
  songwriters?: string = '';
  producers?: string = '';
  publishers?: string = '';

  timeSignature: string = '';
  originalKey: string = '';
  nodes: Node[] | '' = '';
}
