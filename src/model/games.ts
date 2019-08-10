export class Game {
  date: string;
  score: {
    esquerda: number,
    direita: number,
    cruzada: number
  };
  error: {
    esquerda: number,
    direita: number,
    cruzada: number

  };
  time: string;
  played: boolean;
  id: string;
  pacient: string;
  title: string;
  gameID: number;
  config: string;
  observation: string;
  imersiveMode: boolean;
}
