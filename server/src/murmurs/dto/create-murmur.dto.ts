export class CreateMurmurDto {
  content: string;
  access: 'Public' | 'Followers' | 'Private';
}