import { Edition } from "@app/shared/models/edition.model";
import { Node } from "@app/shared/models/node.model";

export class Song {
  id: string = '';
  backup: string = '';
  editions: Edition[] = [new Edition()];
  artists: string = '';
  title: string = '';
  album: string = '';
  albumYear: number | '' = '';
  albumCoverLink?: string = '';
  songwriters?: string = '';
  producers?: string = '';
  publishers?: string = '';
  primaryKey: string = '';
  primaryTimeSig: string = '';
  songDuration: string = '';
  nodes: Node[] = [new Node()];
}
